import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Formik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { vkAPI } from '../../../api/vk'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { VkUsersTable } from '../../../components/Inner/Vk/VkTables/VkUsersTable'
import { VkUser } from '../../../components/Inner/Vk/VkUser'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { clearSelectedUsers, setCurrentFilters, setFiltersGroupUrl, setPaginationPage, toggleSelectedUser } from '../../../store/vk/groups/compare/reducer'
import { vkCompareSelectors } from '../../../store/vk/groups/compare/selectors'

export const VkCompare = () => {
    const pagination = useSelector(vkCompareSelectors.pagination)
    const currentFilters = useSelector(vkCompareSelectors.currentFilters)
    const filters = useSelector(vkCompareSelectors.filters)
    const selectedUsers = useSelector(vkCompareSelectors.selectedUsers)

    const dispatch = useDispatch()
    const permissions = useGetCurrentUserPermissions()
    const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = vkAPI.useDeleteVkUsersMutation()
    const [deleteUser] = vkAPI.useDeleteVkUserMutation()
    const [checkUser] = vkAPI.useCheckVkUserMutation()

    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [])

    const { data: usersResponse } = vkAPI.useGetVkUsersQuery(currentFilters.groupUrl ? { ...currentFilters, ...pagination } : skipToken)

    const users = usersResponse?.content || []
    const count = usersResponse?.totalElements || 0

    useEffect(() => {
        if (filters.groupUrl) {
            dispatch(setCurrentFilters({ currentFilters: filters }))
        }
    }, [filters.groupUrl])

    const toggleSelectedUserHandler = useCallback((id: number) => {
        dispatch(toggleSelectedUser({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!users) {
            return
        }

        for (let user of users) {
            if (isAllToggled) {
                dispatch(toggleSelectedUser({ id: user.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedUser({ id: user.id, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deleteUsersHandler = useCallback(() => {
        deleteUsers(selectedUsers)
    }, [selectedUsers])

    useEffect(() => {
        dispatch(clearSelectedUsers())
        setIsAllToggled(false)
    }, [isSuccessDeleteUsers])

    const onDeleteUser = useCallback((id: number) => {
        deleteUser(id)
    }, [])

    const onCheckUser = useCallback((id: number) => {
        checkUser(id)
    }, [])


    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteUsersHandler }]

    return (
        <div className="search-block">
            <Helmet>
                <title>Сравнение подписчиков</title>
            </Helmet>
            {!currentFilters.groupUrl
                ?
                <>
                    <h2 className="search-block__title">Для сравнения подписчиков сообщества введите&nbsp;в&nbsp;поиск ID или ссылку на сообщество</h2>
                    <div className="search-block__cols">
                        <Formik initialValues={{
                            url: ""
                        }} onSubmit={(values) => {
                            dispatch(setFiltersGroupUrl({ groupUrl: values.url }))
                        }}>
                            {
                                ({ values, submitForm, handleChange }) => (
                                    <>
                                        <div className="search-block__left">
                                            <div className="search search_full">
                                                <label className="search__icon" htmlFor="search-input"></label>
                                                <input value={values.url} name="url" onChange={handleChange} className="search__input js-input-value" id="search-input" type="text" placeholder="ID или ссылка на сообщество" />
                                                <button className="search__remove js-input-clear" type="button"></button>
                                            </div>
                                        </div>
                                        <div className="search-block__right">
                                            <button onClick={submitForm} className="search-block__button button">Поиск</button>
                                        </div>
                                    </>
                                )
                            }
                        </Formik>
                    </div>
                </>
                :
                <>
                    <div className="search-top search-top_no-padding">
                        <p className="search-top__text">По сообществу «{currentFilters.groupUrl}» найдено <a href="#">{count}</a> совпадений:</p>
                    </div>


                    <TableActions actions={tableActions} isActive={!!selectedUsers.length} />

                    <div className="table-block">
                        <VkUsersTable
                            currentUserPermissions={permissions} toggleSelectedUserHandler={toggleSelectedUserHandler}
                            selectedUsers={selectedUsers} setIsAllToggledHandler={setIsAllToggledHandler} users={users}
                            isAllToggled={isAllToggled} onDelete={onDeleteUser} onCheck={onCheckUser}
                        />
                        <Pagination perPage={20} page={pagination.page} count={count ?? 0} onChangePage={onChangePage} />
                    </div>
                </>
            }
        </div>
    )
}
