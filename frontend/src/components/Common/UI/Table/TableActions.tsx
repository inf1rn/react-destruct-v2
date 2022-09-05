import classNames from 'classnames'
import React, { useMemo, useState } from 'react'
import { useGetCurrentUserPermissions } from '../../../../hooks/account'
import { IAction } from '../../../../types/tables'
import { TableAction } from './TableAction'

interface IProps {
    isActive: boolean
    actions: Array<IAction>
}

export const TableActions: React.FC<IProps> = React.memo(({ isActive, actions }) => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const permissions = useGetCurrentUserPermissions()

    const availableActions = useMemo(() => actions.filter(
        action => !action.requiredPermission || permissions.includes(action.requiredPermission)),
        [actions]
    )

    return (
        <>
            {!!availableActions.length &&
                <div className={classNames("table-actions", {
                    active: !isHidden && isActive
                })} onMouseEnter={() => setIsHidden(false)} onMouseLeave={() => setIsHidden(true)}>
                    <div className="table-actions__link js-nav-button">
                        <div className="table-actions__checkbox checkbox">
                            <label className="checkbox__label">
                                <input className="checkbox__input" type="checkbox" checked disabled />
                                <span className="checkbox__icon"></span>
                            </label>
                        </div>
                        <span className="table-actions__text">Действия</span>
                    </div>
                    {
                        isActive && !isHidden &&
                        <div className="status-nav status-nav_top">
                            {
                                availableActions.map((action, index) => <TableAction 
                                    actionClass={action.class} key={index}
                                    callback={action.callback} text={action.text} />)
                            }
                        </div>
                    }
                </div>
            }
        </>

    )
})
