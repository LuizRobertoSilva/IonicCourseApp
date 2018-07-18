import { CityDTO } from "./city.dto";

export interface AddressDTO {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  zipCode: string;
  city: CityDTO;
}
