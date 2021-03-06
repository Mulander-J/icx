import { createApp, ComponentPublicInstance } from 'vue';
import Notification from './notification.vue';

export type OptionsType = {
  content: string;
  duration?: number;
  btn?: string;
};

type InstanceType = {
  id: string;
  vm: ComponentPublicInstance<any>;
}

const instances: InstanceType[] = [];
let seed = 1;

const removeInstance = (id: string, removeHeight: number): void => {
  const index = instances.findIndex(item => item.id === id);
  const len = instances.length;
  
  // remove instance
  instances.splice(index, 1);
  
  if (len < 1) return;
  
  for (let i = index; i < len - 1; i++) {
    const inst = instances[i].vm;
    inst.bottomOffset = inst.bottomOffset - removeHeight - 16;
  }
};

const notify = (options: OptionsType): void => {
  const id = `notification_${seed++}`;
  const container = document.createElement('div');
  document.body.appendChild(container);

  let verticalOffset = 16;
  instances.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + 16;
  });

  const instance = createApp({
    data() {
      return {
        bottomOffset: verticalOffset
      }
    },
    methods: {
      closedFunc(height: number):void {
        removeInstance(id, height);
        document.body.removeChild(container)
        instance.unmount();
      }
    },
    render() {
      return <Notification { ...options } verticalOffset={this.bottomOffset} onClosed={this.closedFunc} />
    }
  });

  instances.push({
    id,
    vm: instance.mount(container)
  });
};

export default notify;

