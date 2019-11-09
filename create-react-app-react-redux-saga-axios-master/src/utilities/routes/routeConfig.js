import React from 'react';
import { Route, Switch } from 'react-router-dom';

function preCondition(condition, store, WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                initialized: false,
                component: WrappedComponent,
            }
        }

        componentDidMount() {
            if (condition && typeof condition === 'function') {
                condition(this.initialize);
            } else {
                this.initialize(WrappedComponent);
            }
        }

        initialize = (component = WrappedComponent) => {
            this.setState({
                initialized: true,
                component,
            });
        }
    
        render() {
            const{ initialized, component: Component } = this.state;
            if (!initialized) return null;
            return (
                <Component {...this.props}> {this.props.children} </Component>
            );
        }
    }
 }

function ReactRouteConfig({ routes, store, base='/' }) {
    function getPath(item, path) {
        return `${path}/${item.path}`.replace(/\/\//g, '/');
    }
    function renderRoutes(routes, path, routesArray) {
        return (
            <div>
                <Switch>
                    {routes.map((item, index) => (
                        <Route
                          key={index} 
                          path={getPath(item, path)} 
                          exact={!!item.exact}
                          render={
                              (props) => {
                                  const { match } = props;
                                  routesArray.push(item);
                                  const NewComponent = preCondition(item.onEnter, store, item.component);
                                  if(item.childRoutes) {
                                      return (
                                            <NewComponent {...props} route={item} store={store} routesArray={routesArray} >
                                                {renderRoutes(item.childRoutes, match.path, routesArray)}
                                            </NewComponent>
                                      );
                                  }
                                  return <NewComponent {...props} route={item} store={store} routesArray={routesArray} />
                              }
                          }
                        > 
                        </Route>
                    ))}
                </Switch>
            </div>
        );
    }
    return renderRoutes(routes, base, []);
}

export default ReactRouteConfig;
