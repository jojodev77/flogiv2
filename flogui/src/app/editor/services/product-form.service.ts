import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Products } from 'src/app/client-spacing/models/product.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';


const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'https://www.floguiboutique.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  constructor(private fb: FormBuilder,
    private httpClient: HttpClient) { }

  product: Products[] = [];
  url = environment;

  buildForm(): FormGroup {
    return this.fb.group({
      type: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
      forme: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
      materiaux: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
      materiauxdeux: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: null,
          updateOn: 'change'
        }
      ),
      materiauxtrois: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: null,
          updateOn: 'change'
        }
      ),
      couleur: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
      couleurdeux: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: null,
          updateOn: 'change'
        }
      ),
      couleurtrois: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: null,
          updateOn: 'change'
        }
      ),
      prix: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
      image: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: null,
          updateOn: 'change'
        }
      ),
      information: new FormControl(
        {
          value: '',
          disabled: false
        },
        {
          validators: [Validators.required],
          updateOn: 'change'
        }
      ),
    });
  }

  getAllProducts(): Observable<any> {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://www.floguiboutique.com',
        'Access-Control-Allow-Headers': '**',
        'Access-Control-Allow-Methods': 'POST, GET, OPTION, PUT',
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<any>(`${this.url.productUrl}/list`).pipe(
      map((res) => {
        this.product = res['data'];
        return this.product;
      }));
  }

  createProduct(data: Products): Observable<Products[]> {

    return this.httpClient.post<Products[]>(`${this.url.productUrl}/ajout`, {data: data})
      .pipe(map((res) => {
        this.product.push(res['data']);
        return this.product;
      }),
        catchError(this.handleError,));
  }

  addBijoux(data: Products) {
    this.httpClient.post<Products[]>(`${this.url.productUrl}/ajout`, data)
    .subscribe(
      res => {
        console.log(res);
       
      },
      err => {
        console.log('Error occured:' , err);
        

      }

    );
  }

  updateProduct(product: Products[]): Observable<Products[]> {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '**',
        'Access-Control-Allow-Headers': '**',
        'Access-Control-Allow-Methods': 'POST, GET, OPTION, PUT',
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<Products[]>(`${this.url.productUrl}/put`, { data: product },  {headers: optionRequete.headers})
  }

  deleteProduct(id: any): Observable<Products[]> {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '**',
        'Access-Control-Allow-Headers': '**',
        'Access-Control-Allow-Methods': 'POST, GET, OPTION, PUT',
        'Content-Type': 'application/json'
      })
    };
    const params = new HttpParams()
      .set('id', id.toString());
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`, { params, headers: optionRequete.headers })
        .pipe(map(res => {
          // tslint:disable-next-line:no-shadowed-variable
          const filteredBijouxs = this.product.filter((Bijoux) => {
            return +Bijoux.id !== +id;
          });
          return this.product = filteredBijouxs;
        }),
          catchError(this.handleError));
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}