import { environment } from 'src/environments/environment';

export abstract class BaseHttpService {

  protected baseUrl: string;

  constructor() {
    this.baseUrl = environment.apiUrl;
   }
}
