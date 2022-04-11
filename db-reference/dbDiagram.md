```Table users as U {
  id int [pk, increment]
  firstName string
  lastName string
  email string unique
  password string
  phoneNumber int unique
  occupation string
  bio text
}
//contactId will be a nullable id
//this will allow non user contacts

Table projects{
  id int [pk, increment]
  userId int
 projectName string
 description text
 startDate datetime
 dueDate datetime
 url string
 projectTypeId int

}
//a project will have a selectable project projectType
//ie homework/project/interview round
Table projectTypes{
  id int [pk, increment]
  projectType string
}

Table projectContacts{
  projectId FK
  contactId FK
}

Table contacts{
  id int [pk, increment]
  userId FK
  firstName string
  lastName string
  email string
  phoneNumber int
  occupation string
  prefCommunicationId string
  contactAssociationId int
}
//a contact will be a point of contact for
// a project or a task projects and tasks
//will have multiple contacts
//users will have contactId to associate/autopopulate contact fields
//contacts will not have to be a user to add

Table contactAssociations{
  id int [pk, increment]
  contactAssociation string
}
//contactAssociation is the association
//to the project i.e. dev/customer/authority

Table prefCommunications{
  id int [pk, increment]
  prefCommunication string
}


Table tasks{
  id int [pk, increment]
  taskTitle string
  description text
  projectId int
  startDate datetime
  dueDate datetime
  tagTypeId int
}


Table tags{
  id int [pk, increment]
  tagType string
}
//tags are importance associations
// urgent/pastdue/important/lucrative


//project belongsTo user
//user has many projects
Ref: U.id < projects.userId

Ref: projectTypes.id < projects.projectTypeId

//contactAssociation has many contacts
//contact belongs to contactAssociation
Ref: contactAssociations.id < contacts.contactAssociationId

Ref: prefCommunications.id < contacts.prefCommunicationId

//projects has many contacts
//contacts has many projects
Ref: projects.id < projectContacts.projectId
Ref: contacts.id < projectContacts.contactId

//tasks has many contacts
//contacts has many tasks


//a tag has many tasks
//a task belongsTo a tag
Ref: tags.id < tasks.tagTypeId

//task belongsTo a project
//projects hasMany tasks
Ref: projects.id < tasks.projectId



//users have one contactId
//contactId belongsTo user
Ref: users.id < contacts.userId //bonus









//user has many comments
//tasks has many comments
Ref: users.id < taskComments.userId
Ref: tasks.id < taskComments.taskId


Table taskComments{
  id int [pk, increment]
  userId FK
  taskId Fk
  comment text
}
// //tasks can have multiple comments
// //from multiple users
```
