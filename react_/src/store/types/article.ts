interface AppExt {
    app_action: string
    app_action_name: string
    WebUrlLink?: string
    target?: number
}
export interface IArticleListType {
    id: number
    type: number
    lang_set: string
    title: string
    s_title: string
    title_color: string
    desc: string
    content: string
    img: string
    mobilecontent: string
    mobileimg: string
    author: string
    add_time: Date | string
    is_skip: number
    skip_path: string
    bind_kactivity: string
    bind_key: string
    app_exts: AppExt | string
    client_type: string
    show_type?: number
    sort?: number
    status?: number
    up_time?: Date | string
}
