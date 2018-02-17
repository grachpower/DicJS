export interface InjectionTokenInterface {
    definition: new (params?: any) => {};
    dependencies: string[];
    singleton?: boolean;
}
