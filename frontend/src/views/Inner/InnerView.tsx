import { Suspense } from 'react'
import { lazily } from 'react-lazily'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Footer } from '../../components/Common/Footer'
import { Header } from '../../components/Inner/Header'
import { newUserPath, parsersPath, parsersTelegramChannelsPath, parsersTelegramPath, parsersTelegramPostsPath, parsersTiktokPath, parsersTiktokPostsPath, parsersTiktokUsersPath, parsersVkGroupsPath, parsersVkPath, parsersVkUsersPath, profilePath, statisticsPath, subculturesAndTagsPath, subculturesPath, tagsPath, technicalSupportPath, telegramChannelsPath, telegramInfographicsPath, telegramPath, telegramPostsPath, tiktokInfographicsPath, tiktokPath, tiktokPostsPath, tiktokUsersPath, usersPath, vkCommunitiesPath, vkComparePath, vkInfographicsPath, vkPath, vkSearchPath, vkUsersPath } from '../../constants/links'
import { viewParsersPermission, viewSubculturesPermission, viewTagsPermission, viewUsersPermission } from '../../constants/permissions'
import { useGetCurrentUserPermissions } from '../../hooks/account'

const { Profile } = lazily(() => import('../../pages/Inner/Profile'))
const { TelegramChannels } = lazily(() => import('../../pages/Inner/Telegram/TelegramChannels'))
const { TelegramDetailChannel } = lazily(() => import('../../pages/Inner/Telegram/TelegramDetailChannel'))
const { TelegramPosts } = lazily(() => import('../../pages/Inner/Telegram/TelegramPosts'))
const { TiktokDetailUser } = lazily(() => import('../../pages/Inner/Tiktok/TiktokDetailUser'))
const { TiktokInfographics } = lazily(() => import('../../pages/Inner/Tiktok/TiktokInfographics'))
const { TiktokPosts } = lazily(() => import('../../pages/Inner/Tiktok/TiktokPosts'))
const { TiktokUsers } = lazily(() => import('../../pages/Inner/Tiktok/TiktokUsers'))
const { Users } = lazily(() => import('../../pages/Inner/Users/Users'))
const { VkDetailGroup } = lazily(() => import('../../pages/Inner/Vk/VkDetailGroup'))
const { VkDetailUser } = lazily(() => import('../../pages/Inner/Vk/VkDetailUser'))
const { VkGroups } = lazily(() => import('../../pages/Inner/Vk/VkGroups'))
const { VkUsers } = lazily(() => import('../../pages/Inner/Vk/VkUsers'))
const { TelegramView } = lazily(() => import('./TelegramView'))
const { TiktokView } = lazily(() => import('./TIktokView'))
const { VkView } = lazily(() => import('./VkView'))
const { TechnicalSupport } = lazily(() => import('./../../pages/Public/TechnicalSupport/TechnicalSupport'))
const { TelegramInfographics } = lazily(() => import('./../../pages/Inner/Telegram/TelegramInfographics'))
const { VkCompare } = lazily(() => import('./../../pages/Inner/Vk/VkCompare'))
const { VkSearch } = lazily(() => import('./../../pages/Inner/Vk/VkSearch'))
const { Statistics } = lazily(() => import('./../../pages/Inner/Statistics'))
const { VkInfographics } = lazily(() => import('./../../pages/Inner/Vk/VkInfographics'))
const { Subcultures } = lazily(() => import('./../../pages/Inner/SubculturesAndTags/Subcultures'))
const { Tags } = lazily(() => import('./../../pages/Inner/SubculturesAndTags/Tags'))
const { SubculturesAndTagsView } = lazily(() => import('./../../views/Inner/SubculturesAndTagsView'))
const { UsersView } = lazily(() => import('./../../views/Inner/UsersView'))
const { ParsersView } = lazily(() => import('./../../views/Inner/Parsers/ParsersView'))
const { ParsersVkView } = lazily(() => import('./../../views/Inner/Parsers/ParsersVkView'))
const { ParsersVkGroups } = lazily(() => import('./../../pages/Inner/Parsers/ParsersVkGroups'))
const { ParsersVkUsers } = lazily(() => import('./../../pages/Inner/Parsers/ParsersVkUsers'))
const { ParsersTelegramView } = lazily(() => import('./../../views/Inner/Parsers/ParsersTelegramView'))
const { ParsersTelegramChannels } = lazily(() => import('./../../pages/Inner/Parsers/ParsersTelegramChannels'))
const { ParsersTiktokUsers } = lazily(() => import('./../../pages/Inner/Parsers/ParsersTiktokUsers'))
const { ParsersTiktokPosts } = lazily(() => import('./../../pages/Inner/Parsers/ParsersTiktokPosts'))
const { ParsersTiktokView } = lazily(() => import('./../../views/Inner/Parsers/ParsersTiktokView'))
const { ParsersTelegramPosts } = lazily(() => import('../../pages/Inner/Parsers/ParsersTelegramPosts'))
const { CurrentUser } = lazily(() => import('../../pages/Inner/Users/CurrentUser'))
const { NewUser } = lazily(() => import('../../pages/Inner/Users/NewUser'))


export const InnerView = () => {
  const permissions = useGetCurrentUserPermissions()

  return (
    <>
      <div className="page-container page-container_inner">
        <Header />
        <main className="main">
          <section className="inner-page inner-wrapper">
            <Suspense>

              <Routes>
                <Route path={technicalSupportPath} element={<TechnicalSupport />} />
                <Route element={<Profile />} path={profilePath} />
                <Route element={<TelegramView />} path={telegramPath}>
                  <Route element={<TelegramChannels />} path={telegramChannelsPath} />
                  <Route element={<TelegramPosts />} path={telegramPostsPath} />
                  <Route element={<TelegramInfographics />} path={telegramInfographicsPath} />

                  <Route element={<TelegramDetailChannel />} path={telegramChannelsPath + "/:id"} />
                  <Route element={<Navigate to={telegramChannelsPath} />} path="" />
                  <Route element={<Navigate to={telegramChannelsPath} />} path="*" />
                </Route>
                <Route element={<VkView />} path={vkPath}>
                  <Route element={<VkGroups />} path={vkCommunitiesPath} />
                  <Route element={<VkUsers />} path={vkUsersPath} />
                  {permissions.includes("view_vk_compare") && <Route element={<VkCompare />} path={vkComparePath} />}
                  {permissions.includes("view_vk_search") && <Route element={<VkSearch />} path={vkSearchPath} />}
                  <Route element={<VkInfographics />} path={vkInfographicsPath} />

                  <Route element={<VkDetailUser />} path={vkUsersPath + "/:id"} />
                  <Route element={<VkDetailGroup />} path={vkCommunitiesPath + "/:id"} />

                  <Route element={<Navigate to={vkCommunitiesPath} />} path="" />
                  <Route element={<Navigate to={vkCommunitiesPath} />} path="*" />
                </Route>
                <Route element={<TiktokView />} path={tiktokPath}>
                  <Route element={<TiktokUsers />} path={tiktokUsersPath} />
                  <Route element={<TiktokPosts />} path={tiktokPostsPath} />
                  <Route element={<TiktokInfographics />} path={tiktokInfographicsPath} />

                  <Route element={<TiktokDetailUser />} path={tiktokUsersPath + "/:id"} />

                  <Route element={<Navigate to={tiktokUsersPath} />} path="" />
                  <Route element={<Navigate to={tiktokUsersPath} />} path="*" />
                </Route>
                <Route element={<Statistics />} path={statisticsPath} />
                {
                  permissions.includes(viewSubculturesPermission) && permissions.includes(viewTagsPermission) && <Route element={<SubculturesAndTagsView />} path={subculturesAndTagsPath}>
                    <Route element={<Subcultures />} path={subculturesPath} />
                    <Route element={<Tags />} path={tagsPath} />

                    <Route element={<Navigate to={subculturesPath} />} path="" />
                    <Route element={<Navigate to={subculturesPath} />} path="*" />
                  </Route>
                }
                {
                  permissions.includes(viewUsersPermission) && <Route element={<UsersView />} path={usersPath}>
                    <Route element={<Users />} path=""></Route>
                    <Route element={<NewUser />} path={newUserPath}></Route>
                    <Route element={<CurrentUser />} path={usersPath + "/id:id"}></Route>

                    <Route element={<Navigate to={usersPath} />} path="" />
                    <Route element={<Navigate to={usersPath} />} path="*" />
                  </Route>
                }
                {
                  permissions.includes(viewParsersPermission) && <Route element={<ParsersView />} path={parsersPath}>
                    <Route element={<ParsersVkView />} path={parsersVkPath}>
                      <Route element={<ParsersVkGroups />} path={parsersVkGroupsPath} />
                      <Route element={<ParsersVkUsers />} path={parsersVkUsersPath} />

                      <Route element={<Navigate to={parsersVkGroupsPath} />} path="" />
                      <Route element={<Navigate to={parsersVkGroupsPath} />} path="*" />
                    </Route>
                    <Route element={<ParsersTelegramView />} path={parsersTelegramPath}>
                      <Route element={<ParsersTelegramChannels />} path={parsersTelegramChannelsPath} />
                      <Route element={<ParsersTelegramPosts />} path={parsersTelegramPostsPath} />

                      <Route element={<Navigate to={parsersTelegramChannelsPath} />} path="" />
                      <Route element={<Navigate to={parsersTelegramChannelsPath} />} path="*" />
                    </Route>
                    <Route element={<ParsersTiktokView />} path={parsersTiktokPath}>
                      <Route element={<ParsersTiktokUsers />} path={parsersTiktokUsersPath} />
                      <Route element={<ParsersTiktokPosts />} path={parsersTiktokPostsPath} />

                      <Route element={<Navigate to={parsersTiktokUsersPath} />} path="" />
                      <Route element={<Navigate to={parsersTiktokUsersPath} />} path="*" />
                    </Route>

                    <Route element={<Navigate to={parsersVkPath} />} path="" />
                    <Route element={<Navigate to={parsersVkPath} />} path="*" />
                  </Route>
                }
                <Route element={<Navigate to={profilePath} />} path="*" />
              </Routes>
            </Suspense>

          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
