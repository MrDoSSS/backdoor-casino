export const authorized: BD.Guard = ({ next, store }) => {
  if (store.loggedIn) {
    next()
  } else {
    next({
      name: 'home',
      stopPipeline: true,
    })
  }
}
