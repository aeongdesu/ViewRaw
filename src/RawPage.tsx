import { ReactNative, constants as Constants } from "@vendetta/metro/common"
import { copyText } from "@vendetta/utils"
import { showToast } from "@vendetta/ui/toasts"
import { getAssetIDByName as getAssetId } from "@vendetta/ui/assets"
import { Forms } from "@vendetta/ui/components"

import { message } from "./index"

const { ScrollView, TouchableOpacity } = ReactNative
const { FormText } = Forms

export default function RawPage() {
    const stringmessage = JSON.stringify(message, null, 4)
    return (<>
        <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onLongPress={() => {
                copyText(stringmessage)
                showToast("Copied raw data to clipboard", getAssetId("toast_copy_link"))
            }}>
                <FormText style={{ fontFamily: Constants.Fonts.CODE_SEMIBOLD, fontSize: 12 }}>
                    {stringmessage}
                </FormText>
            </TouchableOpacity>
        </ScrollView>
    </>)
}