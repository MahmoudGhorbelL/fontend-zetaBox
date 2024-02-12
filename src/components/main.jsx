import axios from 'axios';
import React from 'react';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nomFacture: '',
            reference: '',
            raison: '',
            matricule: '',
            adresse: '',
            dateCF: '',
            dateEF: '',
            note: '',
            infoEnt: '',
            Banque: '',
            IBAN: '',
            email: '',
            produitRef: '',
            produitDes: '',
            produitTot: 0.000,
            produitPU: 0,
            produitQte: 0,
            produitTVA: '',
            produitNet: 0.000,
            rows: [],

        };

    }
    Addfacture = async (e) => {
        e.preventDefault();
        const userEmail = sessionStorage.getItem('userEmail');
        const factureObject = {
            nomFacture: this.state.nomFacture,
            reference: this.state.reference,
            raison: this.state.raison,
            matricule: this.state.matricule,
            adresse: this.state.adresse,
            dateCF: this.state.dateCF,
            dateEF: this.state.dateEF,
            note: this.state.note,
            infoEnt: this.state.infoEnt,
            Banque: this.state.Banque,
            IBAN: this.state.IBAN,
            email: userEmail,
        };

        try {
            console.log(factureObject);
            await axios.post('http://localhost:3001/api/facture', factureObject);
            console.log("facture added successfully");
        } catch (error) {
            console.error('Error adding facture:', error);
        }
    };
    addProduit = async (e) => {
        // e.preventDefault();
        const produit = {
            produitRef: this.state.produitRef,
            produitDes: this.state.produitDes,
            produitQte: parseInt(this.state.produitQte), // Parse string to integer
            produitPU: parseInt(this.state.produitPU),  // Parse string to integer
            produitTVA: this.state.produitTVA,
            produitTot: this.state.produitTot,
            produitNet: this.state.produitNet,
            reference: this.state.reference
        };
        try {
            console.log(produit);
            await axios.post('http://localhost:3001/api/produit/', produit);
            console.log("produit successfully");
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    }

    handlePostPrices = async () => {
        const { totalPrice, TVAPrice, montantNet } = this.state;
        try {
            await axios.get('http://localhost:3001/api/produit/totalPrice', { totalPrice, TVAPrice, montantNet });
            console.log('Prices submitted successfully!');
            this.calculLignePriceTot();
            this.calculPrixTVA();
            this.calculPrixNet();
        } catch (error) {
            console.error('Error submitting prices:', error);
        }
    };
    // handleGetPrices = async () => {
    //     const  = this.state;
    //     try {
    //         await axios.post('http://localhost:3001/api/produit/totalPrice', );
    //         //console.log('Prices submitted successfully!');
    //     } catch (error) {
    //         console.error('Error submitting prices:', error);
    //     }
    // };

    calculLignePriceTot = () => {
        const { produitQte, produitPU } = this.state;
        const x = produitQte * produitPU;

        this.setState({
            produitTot: x,
        });
    };

    calculPrixTVA = () => {
        const { produitTot, produitTVA } = this.state;
        const tvaPercentage = parseFloat(produitTVA) / 100;
        const prixTVA = (produitTot * tvaPercentage).toFixed(3);;

        console.log('Prix TVA:', prixTVA);
    };

    calculPrixNet = () => {
        const { produitTot, produitTVA } = this.state;
        const tvaPercentage = parseFloat(produitTVA) / 100;
        const prixNet = (produitTot - (produitTot * tvaPercentage)).toFixed(3);

        console.log('Prix Net:', prixNet);
    };

    // Function to handle form submission or any other user action
    handleFormSubmit = (e) => {
        const selectedTVA = e.target.value; // Récupérer la valeur sélectionnée
        this.setState({ produitTVA: selectedTVA }, () => {
            this.calculLignePriceTot();
            this.calculPrixTVA();
            this.calculPrixNet();
        })
    };
    handleChangeProduitTVA = (e) => {

        this.setState({
            produitTVA: e.target.value,
        });
    };
    handleAddRow = () => {
        const newRow = (
            <tr key={this.state.rows.length}>

                <td>
                    <input type="text" className="form-control" value={this.state.produitRef} onChange={this.handleChange} name="produitRef" placeholder="Référence" />
                </td>
                <td>
                    <input type="text" className="form-control" value={this.state.produitDes} onChange={this.handleChange} name="produitDes" placeholder="Produit / Service" />
                </td>
                <td>
                    <input type="number" name="produitQte" value={this.state.produitQte} onChange={this.handleChange} onKeyUp={this.calculLignePriceTot} className="form-control" />
                </td>
                <td>
                    <input type="number" name="produitPU" value={this.state.produitPU} onChange={this.handleChange} onKeyUp={this.calculLignePriceTot} className="form-control" />
                </td>
                <td>
                    <select className="form-select" name='produitTVA' value={this.state.produitTVA} aria-label="Default select example" onChange={this.handleFormSubmit}>
                        <option value="0">0</option>
                        <option value="7">7</option>
                        <option value="13">13</option>
                        <option value="19">19</option>
                    </select>
                </td>
                <td><label name="produitTot" aria-readonly value={this.state.produitTot} onChange={this.handleChange}>{this.state.produitTot.toFixed(3)}dt</label></td>
                <td>

                    <svg onClick={() => this.removeRow(this.state.rows.length)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </td>
            </tr>
        );

        this.setState(prevState => ({
            rows: [...prevState.rows, newRow],
        }), () => {
            const totalQte = this.state.rows.reduce((acc, row) => {
                const qte = parseFloat(row.props.children[2].props.children.props.value);
                return isNaN(qte) ? acc : acc + qte;
            }, 0);

            console.log('Total produitQte:', totalQte);
        });
    };

    removeRow = (index) => {
        console.log(index);
        this.setState(prevState => ({
            rows: prevState.rows.splice(1)
        }));
    };
    PrintPage() {
        function handlePrint() {
            const formToPrint = document.querySelector('.ra-form'); // Select the form with class 'ra-form'
            if (formToPrint) {
                // Remove empty text nodes from the form content
                cleanWhitespace(formToPrint);

                // Ensure the form is visible before printing
                formToPrint.style.display = 'block';

                // Print the form
                window.print();

                // Hide the form again after printing
                formToPrint.style.display = 'none';
            } else {
                console.error('Form with class name "ra-form" not found.'); // Log an error if the form is not found
            }
        }
        function cleanWhitespace(element) {
            for (let i = 0; i < element.childNodes.length; i++) {
                const node = element.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
                    // Remove empty text nodes
                    element.removeChild(node);
                    i--; // Adjust the counter after removing a node
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Recursively clean whitespace in child elements
                    cleanWhitespace(node);
                }
            }
        }

        handlePrint(); // call handlePrint function
    }




    render() {

        return (
            <div>
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8">
                        <section class="aboutus-section spad">
                            <div class="about-text">
                                <div class="section-title">
                                    <h1> Générateur de facture et devis gratuit</h1>
                                </div>
                                <p class="f-para">Notre générateur de facture en ligne permet à n’importe qui de facilement créer des factures et des <br /> devis professionnelles au format PDF de manière intuitive.</p>
                            </div>
                        </section>


                        <form className='ra-form' onSubmit={this.Addfacture}>
                            <section class="room-details-section spad">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-5 px-3">
                                            <label class="col-sm-2 col-form-label" style={{ display: "inline-table" }}>
                                                <img src="assets/img/zeta-logo.png" alt="" style={{ width: "170px", height: "100px" }} />{/*<img src="assets/img/logo2.png" alt="" /> */}
                                            </label>

                                        </div>
                                        <div class="col-3">

                                        </div>

                                        <div className="col-4">
                                            <input type="text" name="nomFacture" className="form-control mt-5" placeholder="Facture" value={this.state.nomFacture} onChange={this.handleChange} style={{ fontSize: "40px" }} />
                                            <input type="text" name="reference" className="form-control mt-3" placeholder="Référence (FAC-0001)" value={this.state.reference} onChange={this.handleChange} />
                                        </div>

                                    </div>
                                    <br />

                                    <div class="row">
                                        <div class="col-5 px-3">

                                            <h5 style={{ borderBottom: '5px solid rgb(2, 136, 209)', paddingBottom: '20px' }}>
                                                Détails du client
                                            </h5>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-3"><label>Raison sociale: </label></div>
                                                <div class="col-5 px-3"><input type="text" name="raison" id="" value={this.state.raison} onChange={this.handleChange} className='form-control' placeholder='Raison sociale' /><br /></div>
                                            </div>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-3"><label>Matricule fiscale: </label></div>
                                                <div class="col-5 px-3"><input type="text" name="matricule" value={this.state.matricule} onChange={this.handleChange} id="" className='form-control' placeholder='Matricule fiscale' /><br /></div>
                                            </div>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-3"><label>Adresse: </label></div>
                                                <div class="col-5 px-3"><input type="text" name="adresse" id="" value={this.state.adresse} onChange={this.handleChange} className='form-control' placeholder='Adresse' /><br /></div>
                                            </div>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-4"><label></label></div>
                                                <div class="col-5 px-8 d-flex justify-content-center">
                                                    <button type="button" name='addch1' className="btn btn-primary" style={{ backgroundColor: 'rgb(2, 136, 209)', borderColor: 'rgb(2, 136, 209)' }} onClick={this.handleAddChampClick}>Ajouter un champ</button>
                                                </div>
                                            </div>




                                        </div>
                                        <div class="col-2 px-3">

                                        </div>
                                        <div class="col-5 px-3">
                                            <h5 style={{ borderBottom: '5px solid rgb(2, 136, 209)', paddingBottom: '20px' }}>
                                                Détails du commande
                                            </h5>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-3"><label>Date de création: </label></div>
                                                <div class="col-5 px-3"><input type="date" name="dateCF" value={this.state.dateCF} onChange={this.handleChange} id="" className='form-control' /><br /></div>
                                            </div>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-3"><label>Date d'échéance:: </label></div>
                                                <div class="col-5 px-3"><input type="date" name="dateEF" value={this.state.dateEF} onChange={this.handleChange} id="" className='form-control' /><br /></div>
                                            </div>
                                            <div class="mb-1 row rowRditable">
                                                <div class="col-5 px-4"><label></label></div>
                                                <div class="col-5 px-8 d-flex justify-content-center">
                                                    <button type="button" name='addch2' className="btn btn-primary" style={{ backgroundColor: 'rgb(2, 136, 209)', borderColor: 'rgb(2, 136, 209)' }} onClick={this.handleAddChampClick}>Ajouter un champ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div className='col-12'>
                                            <div>
                                                <table border={1} className="table table-hover table-document" id="tab_logic">
                                                    <thead style={{ borderTop: '5px solid rgb(2, 136, 209)' }}>
                                                        <tr>
                                                            <th className="text-center th-200">Référence</th>
                                                            <th className="text-center th-designation">Désignation</th>
                                                            <th className="text-center th-150">Quantité</th>
                                                            <th className="text-center th-150">Prix unitaire</th>
                                                            <th className="text-center th-150">TVA</th>
                                                            <th className="text-center th-200">Total HT</th>
                                                            <th className="text-center" style={{ width: '40px' }}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr id='prod'>
                                                            <td>
                                                                <input type="text" className="form-control" value={this.state.produitRef} onChange={this.handleChange} name="produitRef" placeholder="Référence" />
                                                            </td>
                                                            <td>
                                                                <input type="text" className="form-control" value={this.state.produitDes} onChange={this.handleChange} name="produitDes" placeholder="Produit / Service" />
                                                            </td>
                                                            <td>
                                                                <input type="number" name="produitQte" value={this.state.produitQte} onChange={this.handleChange} onKeyUp={this.calculLignePriceTot} className="form-control" />
                                                            </td>
                                                            <td>
                                                                <input type="number" name="produitPU" value={this.state.produitPU} onChange={this.handleChange} onKeyUp={this.calculLignePriceTot} className="form-control" />
                                                            </td>
                                                            <td>
                                                                <select className="form-select" name='produitTVA' value={this.state.produitTVA} aria-label="Default select example" onChange={this.handleFormSubmit}>
                                                                    <option value="0">0</option>
                                                                    <option value="7">7</option>
                                                                    <option value="13">13</option>
                                                                    <option value="19">19</option>
                                                                </select>
                                                            </td>
                                                            <td><label name="produitTot" aria-readonly value={this.state.produitTot} onChange={this.handleChange}>{this.state.produitTot.toFixed(3)}dt</label></td>
                                                            <td><svg onClick={(e) => this.addProduit(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
                                                            </svg></td>
                                                        </tr>
                                                        {this.state.rows.map((row, index) => (
                                                            <React.Fragment key={index}>{row}</React.Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div class="d-flex justify-content-center p-4">
                                                    <div className="dropdown">
                                                        <button aria-haspopup="true" onClick={this.handleAddRow} aria-expanded="false" id="dropdown-basic" type="button" className="dropdown-toggle btn btn-primary" style={{ backgroundColor: 'rgb(2, 136, 209)', borderColor: 'rgb(2, 136, 209)' }}>
                                                            Ajouter une ligne
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="row pb-5">
                                            <div class="col-4"></div>
                                            <div class="col-4">
                                                <table className='table'>
                                                    <thead style={{ borderTop: '5px solid rgb(2, 136, 209)' }}>
                                                        <tr>
                                                            <th className="text-center">TVA</th>
                                                            <th className="text-center">Base</th>
                                                            <th className="text-center">Montant</th>
                                                        </tr>
                                                    </thead>

                                                </table>
                                            </div>
                                            <div class="col-4">
                                                <table className='table table-total'>
                                                    <tbody style={{ borderTop: '5px solid rgb(2, 136, 209)' }} >
                                                        <tr>
                                                            <td>Total HT</td>
                                                            <td>0,000 DT</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total TVA</td>
                                                            <td>0,000 DT</td>
                                                        </tr>
                                                        <tr className='btn-add'>
                                                            <td colSpan={2}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                                                </svg>
                                                                Ajouter le timbre fiscal
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Net à payer</td>
                                                            <td>0,000 DT</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center rowRditable pb-5">
                                        <div className="col-7" style={{ paddingRight: '50px' }}>
                                            <div class="showHideInput">
                                                <input className='form-control' type="textarea" name="note" id="" onChange={this.handleChange} value={this.state.note} placeholder='note...' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ borderTop: '5px solid rgb(2, 136, 209)', paddingTop: '30px' }}>
                                        <div className="col-8">
                                            <div>
                                                <h5>INFORMATIONS DE L'ENTREPRISE</h5>
                                                <div className="mb-1 row">
                                                    <div className="col-sm-12">
                                                        <input type="text" name="infoEnt" id="" onChange={this.handleChange} value={this.state.infoEnt} className='form-control' placeholder='Société XYZ, 9 rue exemple, Tunis MF: 0000025 exemple@exemple.tn +216 26 999 999' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <h5>INFORMATIONS BANCAIRE</h5>
                                                <div class="mb-1 row rowRditable">
                                                    <div class="col-3 px-3"><label>Banque: </label></div>
                                                    <div class="col-8 px-3"><input type="text" placeholder='Banque' name="Banque" onChange={this.handleChange} id="" className='form-control' value={this.state.Banque} /><br /></div>
                                                </div>
                                                <div class="mb-1 row rowRditable">
                                                    <div class="col-3 px-3"><label>IBAN: </label></div>
                                                    <div class="col-8 px-3"><input type="text" placeholder='TN59 XXXX XXXX XXXX' onChange={this.handleChange} name="IBAN" id="" className='form-control' value={this.state.IBAN} /><br /></div>
                                                </div>

                                            </div>
                                        </div>
                                        <span className="copy-left mt-5">
                                            <img
                                                src='assets/img/zeta-logo.png'
                                                alt="Swiver.io"
                                                height="20"
                                                style={{ height: '25px', paddingRight: '10px' }}
                                            />
                                            Généré par zeta-box
                                        </span>

                                    </div>
                                </div>


                                <div class="row justify-content-center rowRditable pb-5">
                                    <div className="col-2" style={{ paddingRight: '50px' }}>
                                        <div class="showHideInput">
                                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(2, 136, 209)', borderColor: 'rgb(2, 136, 209)' }} onClick={this.handlePrint}>
                                                save facture
                                            </button>

                                        </div>
                                    </div>
                                    <div className="col-4" style={{ paddingRight: '50px' }}>
                                        <div class="showHideInput">
                                            <button type="button" className="btn btn-primary" style={{ backgroundColor: 'rgb(2, 136, 209)', borderColor: 'rgb(2, 136, 209)' }} onClick={this.PrintPage}>
                                                print facture
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </section >
                        </form>
                    </div>
                    <div class="col-2">
                    </div>
                </div>
            </div >
        )
    }
}
export default Main;