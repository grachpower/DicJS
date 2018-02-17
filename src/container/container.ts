import { InjectionTokenInterface } from "./models/injection-token.interface";

export class Container {
    private servicesTokens = new Map<string, InjectionTokenInterface>();
    private services = new Map<string, {}>();

    public register(name: string, definition: new() => {}, dependencies: string[]): void {
        this.servicesTokens.set(name, {definition: definition, dependencies: dependencies})
    }

    public singleton(name: string, definition: new() => {}, dependencies: string[]): void {
        this.servicesTokens.set(name, {definition: definition, dependencies: dependencies, singleton:true})
    }

    public get(name: string): {} {
        const dependencyToken = this.servicesTokens.get(name);

        if(dependencyToken.singleton) {
            const singletonInstance = this.services.get(name);

            if(singletonInstance) {
                return singletonInstance;
            } else {
                const newSingletonInstance = this._createInstance(dependencyToken);

                this.services.set(name, newSingletonInstance);

                return newSingletonInstance;
            }
        }

        return this._createInstance(dependencyToken)
    }

    private _getResolvedDependencies(service: InjectionTokenInterface): {}[] {
        let classDependencies: {}[] = [];

        if(service.dependencies) {
            classDependencies = service.dependencies.map(dependency => this.get(dependency));
        }

        return classDependencies;
    }

    private _createInstance(service: InjectionTokenInterface): {} {
        return new service.definition(...this._getResolvedDependencies(service));
    }
}