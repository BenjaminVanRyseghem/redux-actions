# switchless-redux-actions
------

Abstract actions for a switchless redux

### Wrap a reducer
------

You have to import the `wrapper`'s function and pass 2 arguments :
- the `reducer`
- the `name` of this reducer (the output will be perform[name])
We advice you to create your name with [NameOfYourReducer]+[Reducer] like : "TasksReducer".

```javascript
wrapper(reducer, "TodoReducer");
```
