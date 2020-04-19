import React from 'react';
import Show from '../components/Show';
import DragII from '../docs-v2/examples/vx-drag-ii/Example';
import DragIISource from '!!raw-loader!../docs-v2/examples/vx-drag-ii/Example';

export default () => {
  return (
    <Show component={DragII} title="Drag II" codeSandboxDirectoryName="vx-drag-ii">
      {DragIISource}
    </Show>
  );
};
