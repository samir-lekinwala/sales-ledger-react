// import React from 'react'

function BoughtForm() {
  function handleSubmit() {}

  return (
    <div>
      <form onSubmit={() => handleSubmit()}>
        <label htmlFor="itembought">Item bought</label>
        <input
          id="itembought"
          name="itembought"
          placeholder="What have you bought?"
        ></input>
        <label htmlFor="howmuch">For how much?</label>
        <input id="howmuch" name="howmuch" placeholder="For how much?"></input>
        <label htmlFor="shipping">Any shipping cost?</label>
        <input
          id="shipping"
          name="shipping"
          placeholder="Any shipping cost?"
        ></input>
      </form>
    </div>
  )
}

export default BoughtForm
