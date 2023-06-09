import { computed } from 'vue';
import { makeClasses } from '../dependencies';

// @ts-ignore
import { IMeta } from '../index.vue'

interface IThemeProps extends Pick<IMeta['props'], 'themeSettings'>{

}

export default function(context: IMeta) {
    const { props } = context;

    const useClasses = makeClasses<IThemeProps>(() => ({
        root: ({ themeSettings }) => [themeSettings?.root,
            'flex space-x-4 mb-8'
        ],
    }));

    return computed<ReturnType<typeof useClasses>>(() => {
        return useClasses({
            themeSettings: props.themeSettings
        });
    });
}
