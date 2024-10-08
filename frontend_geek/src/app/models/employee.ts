import { Gender } from "../enums/gender";
import {Position} from "../enums/position";
import {UUID} from "../types/uuid";
//  Les données de l'employé 
export interface Employee {
  id?: UUID,
  gender: Gender,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: string,
  city: string,
  country: string,
  remainingVacationDays: number,
  onVacation: boolean,
  position: Position,
  imageURL?: string,
}
