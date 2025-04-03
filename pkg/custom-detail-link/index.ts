import { importTypes } from '@rancher/auto-import';
import { IPlugin, TableColumnLocation } from '@shell/core/types';

// Init the package
export default function (plugin: IPlugin): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  plugin.addTableColumn(
    TableColumnLocation.RESOURCE,
    { resource: ['configmap'] },
    {
      name: 'some-prop-col',
      label: 'Custom Detail Link',
      getValue: () => {
        return 'Custom Detail Link'
      },
      formatter: 'LinkDetail',
      formatterOpts: {
        getCustomDetailLink: () => {
          console.log('this is called');

          return {
            name: 'home'
          };
        },
      },
    }
  )

  // Load a product
  // plugin.addProduct(require('./product'));
}
