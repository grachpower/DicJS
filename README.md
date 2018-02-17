# DicJS

## Simple dependency injection container written on TS / JS

## Usage:
```javascript
const container = new Container();

container.register('myClass', classDefinition);
container.singleton('logger', LoggerClass, ['myClass']);
container.register('user', User, ['logger']);

const classInstance = container.get('logger') // a new instance of classDefinition
```
