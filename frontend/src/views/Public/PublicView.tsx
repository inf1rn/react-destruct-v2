import { lazily } from 'react-lazily'
import { Navigate, Route, Routes } from 'react-router'
import { forgotPasswordPath, loginPath, passwordRecoveryPath, registrationPath, technicalSupportPath } from '../../constants/links'
import { Header } from '../../components/Public/Header'
import { Suspense } from 'react'
import { Footer } from '../../components/Common/Footer'
import { TechnicalSupport } from '../../pages/Public/TechnicalSupport/TechnicalSupport'

const { Login } = lazily(() => import('../../pages/Public/Login'))
const { ForgotPassword } = lazily(() => import('../../pages/Public/ForgotPassword/ForgotPassword'))
const { Registration } = lazily(() => import('../../pages/Public/Registration/Registration'))
const { PasswordRecovery } = lazily(() => import('../../pages/Public/PasswordRecovery/PasswordRecovery'))

export const PublicView = () => {
    return (
        <>
            <div className="page-container">
                <Header />
                <main className="main">
                    <Suspense>
                        <section className="login-page wrapper">
                            <Routes>
                                <Route path={loginPath} element={<Login />} />
                                <Route path={registrationPath} element={<Registration />} />
                                <Route path={forgotPasswordPath} element={<ForgotPassword />} />
                                <Route path={passwordRecoveryPath} element={<PasswordRecovery />} />
                                <Route path={technicalSupportPath} element={<TechnicalSupport />} />
                                <Route path="*" element={<Navigate to={loginPath} />} />

                            </Routes>
                        </section>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </>

    )
}
