import { PartialType } from "@nestjs/mapped-types";
import { CreateAlamatDto } from "./create-alamat.dto";

export class UpdateAlamatDto extends PartialType(CreateAlamatDto) {}