import { before, after } from "@vendetta/patcher"
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets"
import { findByProps as getByProps } from "@vendetta/metro"
import { ReactNative, NavigationNative } from "@vendetta/metro/common"
// navigation not working for me lol

import RawPage from "./RawPage"

export let message: any

let block: boolean

export default {
    onLoad: () => {
        if (block) return
        const ActionSheet = getByProps("hideActionSheet")
        const Navigation = getByProps("push", "pushLazy", "pop")
        const DiscordNavigator = getByProps("getRenderCloseButton")
        const { default: Navigator, getRenderCloseButton } = DiscordNavigator
        before("openLazy", ActionSheet, (ctx) => {
            const [component, args] = ctx
            if (args == "MessageLongPressActionSheet")
                component.then(instance => {
                    after("default", instance, (_, component) => {
                        const [{ props: { message: msg } }, oldbuttons] = component.props?.children?.props?.children?.props?.children
                        message = msg
                        if (oldbuttons) {
                            const ButtonRow = oldbuttons[0].type
                            const navigator = () => (
                                <Navigator
                                    initialRouteName="RawPage"
                                    goBackOnBackPress={true}
                                    screens={{
                                        RawPage: {
                                            title: "",
                                            headerLeft: getRenderCloseButton(() => Navigation.pop()),
                                            render: RawPage
                                        }
                                    }}
                                />
                            )
                            if (oldbuttons.filter(a => a.props.message == "View Raw").length > 0) return
                            component.props.children.props.children.props.children[1] = [<ButtonRow
                                key={-1}
                                message="View Raw"
                                iconSource={getAssetId("ic_chat_bubble_16px")}
                                onPressRow={() => {
                                    ActionSheet.hideActionSheet()
                                    Navigation.push(navigator)
                                }}
                            />, ...oldbuttons]
                        }
                    })
                })
        })
    }
}