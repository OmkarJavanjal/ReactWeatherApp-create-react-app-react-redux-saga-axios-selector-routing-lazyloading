import Component1 from "../../components/component1";
import Component2 from "../../components/component2";
import Component3 from "../../components/component3";
import { getHooks } from '../hooks';
export default function (store: any) {
    const { injectReducer, injectSagas } = getHooks(store)
    return [
        {
            path: '',
            test1: 'omkar',
            test2: 'javanjal',
            onEnter: (cb: Function) => {
                const loadFiles = Promise.all([
                    import('../../containers/Home/reducer'),
                    import('../../containers/Home/sagas'),
                    import ('../../containers/Home/index'),
                ]);
                loadFiles.then(([HomeReducer, HomeSagas, HomeComponent]) => {
                    injectReducer('Home', HomeReducer.default);
                    injectSagas(HomeSagas.default);
                    cb(HomeComponent.default);
                })
            },
            childRoutes: [
                {
                    path: 'component1',
                    component: Component1,
                    test1: 'omkar',
                    test2: 'javanjal',
                    onEnter: (cb: Function) => {
                        console.log('here2');
                        cb();
                    },
                    childRoutes: [
                        {
                            path: 'component2',
                            component: Component2,
                            test1: 'omkar',
                            test2: 'javanjal',
                            onEnter: (cb: Function) => {
                                console.log('here31')
                                cb();
                            },
                            childRoutes: [
                                {
                                    path: 'component3',
                                    component: Component3,
                                    test1: 'omkar',
                                    test2: 'javanjal',
                                    onEnter: (cb: Function) => {
                                        console.log('here32')
                                        cb();
                                    },
                                    childRoutes: [
                                        {
                                            path: 'component4',
                                            component: Component1,
                                            test1: 'omkar',
                                            test2: 'javanjal',
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                }
            ]
        },
    ];
}
