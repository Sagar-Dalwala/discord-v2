import React from 'react'

function page({testing=false}) {
  if(!testing)
    process.exit(0);
  return (
    <div data-testid="crash-route">Page 1</div>
  )
}

export default page