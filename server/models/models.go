package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDoList struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title  string             `json:"title,omitempty" bson:"title,omitempty"`
	Note   string             `json:"note,omitempty" bson:"note,omitempty"`
	Status string             `json:"status,omitempty" bson:"status,omitempty"`
}
