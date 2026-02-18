import { type CmsComponent } from "@remkoj/optimizely-cms-react"
import { ButtonBlockDataFragmentDoc, type ButtonBlockDataFragment, LinkDataFragmentDoc } from "@/gql/graphql"
import { getFragmentData } from "@gql/fragment-masking"
import { Button } from "@components/shared/button"
import { omitCmsComponentProps } from "@/lib/filter-props"

/**
 * Button (Mobile variant)
 * Mobile-optimized version of the button component
 */
export const ButtonBlockMobileComponent : CmsComponent<ButtonBlockDataFragment> = ({ 
    data: { 
        url: configuredUrlFragment, 
        buttonType: configuredButtonType,
        buttonVariant: configuredButtonVariant, 
        className: configuredClassName, 
        children: text 
    } = {}, 
    ctx,
    ...props 
})  => {
    const url = getFragmentData(LinkDataFragmentDoc, configuredUrlFragment)
    const buttonType = (configuredButtonType || undefined) as 'primary' | 'secondary' | undefined
    const buttonVariant = (configuredButtonVariant || undefined) as 'default' | 'cta' | undefined
    const linkHref = url?.default ?? '#'
    const className = `${configuredClassName ?? ''} w-full`.trim() // Full width on mobile

    return <Button 
        { ...omitCmsComponentProps(props) } 
        url={ linkHref || "#"} 
        buttonColor="default" 
        buttonType={buttonType} 
        buttonVariant={ buttonVariant } 
        className={ className }
    >
        { text }
    </Button>
}
ButtonBlockMobileComponent.displayName = "Button (Component/ButtonBlock/mobile)"
ButtonBlockMobileComponent.getDataFragment = () => ['ButtonBlockData', ButtonBlockDataFragmentDoc]

export default ButtonBlockMobileComponent
