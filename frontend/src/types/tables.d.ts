export interface IAction {
    text: string
    class?: string
    requiredPermission?: string
    isActive?: boolean
    callback: () => void
}