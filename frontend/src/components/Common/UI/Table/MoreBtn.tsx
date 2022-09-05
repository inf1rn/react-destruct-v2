import React, { useMemo, useState } from 'react'
import { useGetCurrentUserPermissions } from '../../../../hooks/account'
import { IAction } from '../../../../types/tables'
import { TableAction } from './TableAction'

interface IProps extends React.PropsWithChildren {
    actions: Array<IAction>
}

export const MoreBtn: React.FC<IProps> = React.memo(({ actions }) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const permissions = useGetCurrentUserPermissions()

    const availableActions = useMemo(() => actions.filter(
        action =>  action.isActive || (!action.requiredPermission || permissions.includes(action.requiredPermission))),
        [actions]
    )

    return (
        <>
            {
                !!availableActions.length && <div className="mob-actions js-nav">
                    <button className="dots-button js-nav-button" onClick={() => setIsActive(!isActive)} type="button"></button>
                    {
                        isActive &&
                        <div className="status-nav">
                            {
                                availableActions.map((action, index) => <TableAction 
                                    actionClass={action.class} key={index}
                                    callback={action.callback} text={action.text} />)
                            }
                        </div>
                    }
                </div >
            }
        </>
    )
})
