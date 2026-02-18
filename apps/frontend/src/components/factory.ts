import 'server-only'
import { type ComponentFactory, DefaultComponentFactory, RichTextComponentDictionary, createHtmlComponent } from '@remkoj/optimizely-cms-react/rsc'
import cmsComponents from './cms'

// Create the server factory, to be reused throughout the application
export const factory : ComponentFactory = new DefaultComponentFactory()
factory.registerAll(RichTextComponentDictionary)
factory.registerAll(cmsComponents)

// Ensure common HTML elements used inside rich text are registered so static
// rendering doesn't warn about missing renderers (e.g. <address> nodes).
factory.register('RichText/address', createHtmlComponent('address'))

/**
 * Get the cached version of the Component Factory to use, this ensure that the
 * minimum number of instances of the factory will be created.
 */
export const setupFactory = () => factory;

export default setupFactory
