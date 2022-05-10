import { createApp, ComponentPublicInstance } from 'vue';
import VerifyPop from './VerifyPop.vue';

export type OptionsType = {};

type InstanceType = {
  id: string;
  vm: ComponentPublicInstance<any>;
}

const instances: InstanceType[] = [];
let seed = 1;

const removeInstance = (id: string): void => {
  const index = instances.findIndex(item => item.id === id);
  // remove instance
  instances.splice(index, 1);
};

const verify = (options: OptionsType, cbk:any): void => {
  const id = `verify_${seed++}`;
  const container = document.createElement('div');
  document.body.appendChild(container);

  const instance = createApp({
    data() {
      return {}
    },
    methods: {
      closedFunc(isPass:boolean):void {
        removeInstance(id);
        instance.unmount();
        document.body.removeChild(container);
        cbk(isPass)
      }
    },
    render() {
      return <VerifyPop { ...options } onClosed={this.closedFunc} />
    }
  });

  instances.push({
    id,
    vm: instance.mount(container)
  });
};

export default verify;

