import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getItem } from '../apis/api'
import { useQuery } from '@tanstack/react-query'
import { item } from '../models/items'
import EditForm from '../components/EditForm'

function Edit() {
  return (
    <>
      <EditForm />
      {/* <div>{queryParameters.get('id')}This is the edit screen</div> */}
      {/* <div>{data.item}This is the edit screen</div> */}
    </>
  )
}

export default Edit
