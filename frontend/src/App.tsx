import { PublicView } from "./views/Public/PublicView";
import "./assets/css/main.css"
import { InnerView } from "./views/Inner/InnerView";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialized } from "./store/app/app";
import { accountAPI } from "./api/account";
import { Cookie } from "./utils/cookie";
import { setJwt } from "./store/account/account";
import { appSelectors } from "./store/app/selectors";
import { useGetCurrentUser } from "./hooks/account";

export const App = () => {
  const initialized = useSelector(appSelectors.initialized)

  const dispatch = useDispatch()
  const jwt = new Cookie("jwt").getValue()
  const { data: user, isSuccess, isError } = useGetCurrentUser()

  const [setLastVisit] = accountAPI.useSetLastVisitMutation()

  const setLastVisitHandler = useCallback(() => user && setLastVisit({ id: user.id }), [user])

  useEffect(() => {
    if (jwt) {
      dispatch(setJwt({ jwt: jwt }))
    }
  }, [jwt])

  useEffect(() => {
    if (!jwt) {
      dispatch(setInitialized({ initialized: true }))
    }
  }, [])

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(setInitialized({ initialized: true }))
    }

    if (isSuccess) {
      window.addEventListener("beforeunload", setLastVisitHandler)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (!jwt) {
      window.removeEventListener("beforeunload", setLastVisitHandler)
    }
  }, [jwt])

  return (

    !initialized ?
      <>
      </>
      :
      <>
        {
          user && jwt ?
            <InnerView />
            :
            <PublicView />
        }
      </ >


  )
}