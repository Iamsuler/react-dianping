import Loadable from 'react-loadable'

function Loading (props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

const loadable = (loader, loading = Loading) => {
  return Loadable({
    loader,
    loading,
    delay: 300,
    timeout: 10000
  })
}

export default loadable
