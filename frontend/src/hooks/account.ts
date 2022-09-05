import { accountAPI } from './../api/account';
import { useTypedDispatch } from './common';
import { useNavigate } from 'react-router-dom';
import { setJwt } from '../store/account/account';
import { useSelector } from 'react-redux';
import { accountSelectors } from '../store/account/selectors';
import { accountPipes } from '../pipes/account/account';
import { Cookie } from '../utils/cookie';

export const useLogout = () => {
    const cookie = new Cookie("jwt")
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    return () => {
        cookie.setValue("", 0)
        navigate("/login")
        dispatch(setJwt({ jwt: "" }))
    }
}

export const useGetCurrentUser = () => {
    const jwt = useSelector(accountSelectors.jwt)

    const data = accountAPI.useGetCurrentQuery({ jwt }, {
        skip: !jwt.length
    })

    if (data.isError) {
        new Cookie("jwt").setValue("", 0)
    }

    return data
}

export const useGetCurrentUserPermissions = () => {
    const { data: user } = useGetCurrentUser()

    return user ? accountPipes.permissions(user) : []

}