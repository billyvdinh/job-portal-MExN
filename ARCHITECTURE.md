## Model

1. User

- id: string
- name: string
- email: string
- password: string(hashed)
- role: enum
  [user, admin]

2. Job

- id: uuid
- title: string
- description: string
- applicants: number
  number of applicants
- status: enum
  [pending, open, closed]

3. Application

- job_id: uuid
- user_id: uuid
- description: string
- attachments : array
  array of file path string
- status: enum
  [pending, approved, disapproved, resubmit]
- action: enum
  [description, attachments]

## API

1. Auth
   > User, Admin

- /auth/register
- /auth/login
- /auth/logout

2. User
   > Admin

- POST: /users
- GET: /users/:id
- PATCH: /users/:id
- DELETE: /users/:id

2. Job
   > Admin

- POST: /jobs
- PATCH: /jobs/:id
- DELETE: /jobs/:id
  > User, Admin
- GET: /jobs
- GET: /jobs/:id

3. Application
   > Admin

- GET: /applications
- GET: /applications/:id
- PATCH: /applications/:id
- DELETE: /applications:/id

  > User

- POST: /applications
- PATCH: /applications/:id
