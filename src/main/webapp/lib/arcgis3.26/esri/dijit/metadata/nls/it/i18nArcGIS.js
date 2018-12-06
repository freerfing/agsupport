// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/nls/it/i18nArcGIS",{documentTypes:{arcgis:{caption:"Metadati ArcGIS",editorCaption:"Metadati",description:""}},emptyOption:"Vuoto",conditionals:{ISO19139A1_ROW4:"Se il livello gerarchico dei metadati \u00e8 Dataset, \u00e8 richiesto un rettangolo di selezione geografico o una descrizione geografica.",ISO19139A1_ROW6:"\u00c8 richiesto un identificatore o un nome di dataset.",ISO19139A1_ROW7:"Se si sceglie Altre restrizioni, \u00e8 richiesto Altri vincoli.",ISO19139A1_ROW9:"Se l'ambito non \u00e8 Dataset o Serie, \u00e8 richiesta una descrizione livello.",
ISO19139A1_ROW10_11_12:"Se l'ambito \u00e8 Dataset o Serie, \u00e8 richiesto uno dei parametri Dichiarazione, Passaggio processo oppure Origine dati.",ISO19139A1_ROW15:"Se \u00e8 selezionato Disponibilit\u00e0 punto di controllo, \u00e8 richiesto Descrizione punto di controllo.",ISO19139A1_ROW18:"Se Distribuzione \u00e8 documentato, \u00e8 richiesto un formato o distributore/formato.",INSPIRE_AccessLimitation:" \u00c8 necessario specificare almeno un codice di vincolo di accesso legale o di classificazione di sicurezza. (INSPIRE)",
INSPIRE_UseLimitation:" \u00c8 richiesta almeno una limitazione d'uso. (INSPIRE)",INSPIRE_ConformanceResult:"Un report di coerenza dominio richiede un risultato di conformit\u00e0. (INSPIRE)",INSPIRE_DomainConsistency:"\u00c8 richiesto un report di coerenza dominio. (INSPIRE)",INSPIRE_LineageStatement:"Se l'ambito \u00e8 Dataset o Series, \u00e8 richiesta una dichiarazione lineage. (INSPIRE).",FGDC_DescIfTemporal:"\u00c8 richiesta una descrizione per un'estensione temporale. (FGDC)",FGDC_Keywords:"\u00c8 richiesto un argomento, un tag o una parola chiave del tema. (FGDC)",
FGDC_Reports:"Sono richiesti report di omissione completezza e di coerenza concettuale. (FGDC)",FGDC_Temporal:"\u00c8 richiesta almeno un'estensione temporale. (FGDC)",NAP_Contact:"\u00c8 richiesto un indirizzo/punto di consegna, numero di telefono/voce o un risorsa online/un URL. (NAP)",GEN_BoundingBox:"\u00c8 richiesto almeno un rettangolo di selezione geografico.",GEN_ReportResult:"\u00c8 richiesto un risultato di conformit\u00e0 o quantitativo.",minLessThanMax:"Il valore minimo deve essere minore di quello massimo."},
hints:{integerGreaterThanZero:"(immettere un intero \x3e 0)",integerGreaterThanOne:"(immettere un intero \x3e 1)",integer0To100:"(Immettere un intero 0..100)",maxScale:"(immettere un intero \x3e 0, ad es. 50000)",minScale:"(immettere un intero \x3e 0, ad es. 150000000)",number0To100:"(immettere un numero 0..100)",number0To360:"(immettere un numero 0..360)",number90To90:"(immettere un numero -90..90)",listOfDoubles:"(immettere un elenco di numeri, utilizzare uno spazio per separare)"},htmlEditor:{button:"Modifica..."},
sections:{overview:"Panoramica",esri:"Esri",resource:"Risorsa",reference:"Riferimento",content:"Contenuto",distribution:"Distribuzione",quality:"Qualit\u00e0",eainfo:"Campi",representation:"Rappresentazione",metadata:"Metadati"},metadataStyle:{caption:"Stile metadati ArcGIS",changeButton:"Cambia....",dialogTitle:"Scegliere uno stile di metadati",updating:"Aggiornamento del documento in corso...","Item Description":"Descrizione elemento","FGDC CSDGM Metadata":"Metadati FGDC CSDGM","ISO 19139 Metadata Implementation Specification":"Specifiche di implementazione metadati ISO 19139",
"ISO 19139 Metadata Implementation Specification GML3.2":"Specifiche di implementazione metadati GML3.2 ISO 19139","INSPIRE Metadata Directive":"Direttiva sui metadati INSPIRE","North American Profile of ISO19115 2003":"Profilo nord americano ISO19115 2003"},aggrInfo:{caption:"Informazioni di aggregazione",datasetHint:"\u00c8 richiesto un identificatore o un nome di dataset.",aggrDSIdent:"Identificatore di dataset",aggrDSName:"Nome dataset"},appSchInfo:{caption:"Schema dell'applicazione",asName:"Nome schema",
asSchLang:"Lingua dello schema",asCstLang:"Lingua vincolo",asAscii:"ASCII",asGraFile:"File elementi grafici",asGraFile_src:"Origine file elementi grafici",asSwDevFile:"File di sviluppo software",asSwDevFile_src:"Origine file di sviluppo software",asSwDevFiFt:"Formato file di sviluppo software"},citation:{caption:"Citazione",section:{titlesAndDates:"Titoli e date",links:"URL di",identifiers:"Identificatori",presentation:"Forma",other:"Altro",edition:"Edizione",series:"Serie"},conditionalDate:{caption:"Data citazione",
msg:"\u00c8 richiesto uno dei parametri Data di creazione, Data di Pubblicazione o Data di revisione.",msg_nap:"\u00c8 richiesta una data di citazione."},resTitle:"Titolo",resAltTitle:"Titolo alternativo",collTitle:"Titolo collettivo",date:{createDate:"Data di creazione",pubDate:"Data di Pubblicazione",reviseDate:"Data di revisione",notavailDate:"Nessuna data disponibile",inforceDate:"Data di entrata in vigore",adoptDate:"Data di adozione",deprecDate:"Data di ritiro",supersDate:"Data di sostituzione"},
isbn:"ISBN",issn:"ISSN",citId:{caption:"Identificatore",identCode:"Codice",identAuth:"Citazione autorit\u00e0"},resEd:"Edizione",resEdDate:"Data edizione",datasetSeries:{seriesName:"Nome",issId:"Problema",artPage:"Pagina"},otherCitDet:"Altri dettagli",contactCaption:"Contatto citazione"},cntAddress:{caption:"Indirizzo",delPoint:"Punto di consegna",city:"Citt\u00e0",adminArea:"Area amministrativa",postCode:"Codice postale",country:"Paese",eMailAdd:"E-mail",addressType:{caption:"Tipo indirizzo",postal:"Postale",
physical:"Fisico",both:"Entrambi"}},cntOnlineRes:{caption:"Risorsa online",linkage:"URL",protocol:"Protocollo",appProfile:"Profilo d'applicazione",orName:"Nome",orDesc:"Descrizione"},cntPhone:{caption:"Telefono",voiceNum:"Voce",faxNum:"Fax",tddtty:"TDD/TTY?"},codeRef:{caption:"Identificatore",identCode:"Codice",idCodeSpace:"Spazio di codici",idVersion:"Versione",identAuth:"Citazione autorit\u00e0"},constraints:{caption:"Vincoli",useLimit:"Limitazione d'uso",general:{caption:"Generale"},legal:{caption:"Legale",
accessConsts:"Vincoli di accesso",useConsts:"Vincoli d'uso",othConsts:"Altri vincoli"},security:{caption:"Sicurezza",classSys:"Sistema di classificazione",userNote:"Nota utente",handDesc:"Descrizione gestione"}},contInfo:{caption:"Informazioni sul contenuto",section:{CovDesc:"Descrizione coverage",ImgDesc:"Descrizione immagine",FetCatDesc:"Catalogo feature"},attDesc:"Descrizione attributo",covDim:{caption:"Intervallo o banda",seqID:"Identificatore sequenza",seqIDType:"Tipo identificatore sequenza",
dimDescrp:"Descrittore"},RangeDim:{caption:"Dimensione intervallo"},Band:{caption:"Banda",minVal:"Valore Minimo",maxVal:"Valore Massimo",valUnit:"Unit\u00e0 valore",pkResp:"Risposta di picco",bitsPerVal:"Bit per valore",toneGrad:"Gradazione tonalit\u00e0",sclFac:"Fattore di Scala",offset:"Offset"},CovDesc:{caption:"Descrizione coverage",section:{description:"Descrizione",rangesAndBands:"Intervalli e bande"}},ImgDesc:{caption:"Descrizione immagine",section:{description:"Descrizione",rangesAndBands:"Intervalli e bande"},
illElevAng:"Angolo di elevazione dell'illuminazione",illAziAng:"Angolo di azimuth dell'illuminazione",cloudCovPer:"Percentuale copertura nubi",cmpGenQuan:"Qualit\u00e0 compressione",trianInd:"Indicatore triangolazione?",radCalDatAv:"Disponibilit\u00e0 dati di calibrazione radiometrica?",camCalInAv:"Disponibilit\u00e0 informazioni di calibrazione fotocamera?",filmDistInAv:"Disponibilit\u00e0 informazioni sulla distorsione della pellicola?",lensDistInAv:"Disponibilit\u00e0 informazioni distorsione lente?",
imagQuCode:"Codice qualit\u00e0",prcTypCde:"Codice livello di elaborazione"},FetCatDesc:{caption:"Catalogo feature",section:{description:"Descrizione",featureTypes:"Tipi di feature",citation:"Citazione"},compCode:"Conforme a ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"Citazione catalogo feature",catFetTyps:{caption:"Tipo feature",genericName:"Nome",codeSpace:"Spazio di codici"}}},contact:{caption:"Contatto",section:{name:"Nome del contatto",info:"Informazioni di contatto",hoursAndInstructions:"Ore ed istruzioni"},
conditionalName:{caption:"Nome del contatto",msg:"\u00c8 richiesto uno dei parametri Nome individuale, Nome organizzazione o Nome posizione.",msg_fgdc:"\u00c8 richiesto uno dei parametri Nome individuale o Nome organizzazione."},rpIndName:"Nome individuale",rpOrgName:"Nome organizzazione",rpPosName:"Nome posizione",rpCntInfo:"Informazioni di contatto",cntHours:"Orari di servizio",cntInstr:"Istruzioni di contatto"},distInfo:{caption:"Informazioni di distribuzione",section:{format:"Formato",distributor:"Distributore",
transfer:"Opzioni di trasferimento"},distFormat:{caption:"Formato di distribuzione",formatName:"Nome Formato",formatVer:"Versione formato",formatAmdNum:"Numero correzione",formatSpec:"Specifica",fileDecmTech:"Tecnica di decompressione",formatInfo:"Contenuto informazioni"},distributor:{caption:"Distributore"},distTranOps:{caption:"Opzioni di trasferimento digitale",section:{unitsAndSize:"Unit\u00e0"},unitsODist:"Unit\u00e0 di distribuzione",transSize:"Dimensioni trasferimento",offLineMed:{caption:"Supporto offline",
medDensity:"Densit\u00e0",medDenUnits:"Unit\u00e0 di densit\u00e0",medVol:"Volumi",medNote:"Nota supporto"}},distorOrdPrc:{caption:"Processo d'ordine",resFees:"Tariffe",planAvDtTm:"Data disponibile",planAvTmPd:{caption:"Periodo data disponibile",tmBegin:"Data/ora di inizio",tmEnd:"Data/ora di fine"},ordInstr:"Istruzioni sull'ordine",ordTurn:"Inversione"}},dqInfo:{caption:"Qualit\u00e0 dei dati",section:{scope:"Ambito",report:"Report",lineage:"Lineage"},dqScope:{section:{level:"Livello",extent:"Estensione"},
scpLvl:"Livello ambito",scpLvlDesc:"Descrizione livello",scpExt:"Estensione ambito"},report:{section:{measure:"Misura",evaluation:"Valutazione",result:"Risultato",conformance:"Conformit\u00e0"},measDesc:"Descrizione misura",measName:"Nome misura",measDateTm:"Data misura",measId:"Identificatore di misura",evalMethDesc:"Metodo di valutazione",evalProc:"Citazione procedura",ConResult:{caption:"Risultati conformit\u00e0",conExpl:"Spiegazione",conSpec:"Specifica",conPass:{caption:"Gradi",_1:"Conforme",
_0:"Non conforme"}},QuanResult:{caption:"Risultato quantitativo",quanVal:"Valore",quanValType:"Tipo di valore",quanValUnit:"Unit\u00e0 valore",errStat:"Statistiche errori"}},dataLineage:{section:{statement:"Istruzione",dataSource:"Origine dati",prcStep:"Passaggio processo"},statement:"Dichiarazione lineage",dataSource:{caption:"Origine dati",section:{description:"Descrizione",srcRefSys:"Sistema di Riferimento",srcExt:"Estensione",srcCitatn:"Citazione"},srcDesc:"Descrizione origine",srcScale:{rfDenom:"Denominatore scala"},
srcRefSys:"Sistema di riferimento di origine",srcExt:"Estensione origine",srcCitatn:"Citazione origine"},prcStep:{caption:"Passaggio processo",section:{description:"Descrizione",stepProc:"Processore",stepSrc:"Origine dati"},stepDesc:"Descrizione processo",stepRat:"Logica",stepDateTm:"Data passaggio processo",stepProc:"Processore",stepSrc:"Origine dati"}}},eainfo:{caption:"Informazioni su entit\u00e0 e attributi",section:{detailed:"Dettagli",overview:"Panoramica"},detailed:{caption:"Dettagli entit\u00e0 ed attributi",
section:{enttyp:"Entit\u00e0",attr:"Attributi"},enttyp:{caption:"Tipo entit\u00e0",enttypl:"Etichetta",enttypt:"Oggetto",enttypc:"Conteggio",enttypd:"Definizione",enttypds:"Origine definizione"},attr:{caption:"Attributo",section:{description:"Descrizione",value:"Valore",domain:"Dominio"},attrlabl:"Etichetta",attalias:"Alias",attrdef:"Definizione",attrdefs:"Origine definizione",attrtype:"Tipo",attwidth:"Larghezza",atprecis:"Precisione",attscale:"Scala",atindex:"Indicizzato",attrvai:{attrva:"Spiegazione valore",
attrvae:"Precisione valore"},attrmfrq:"Frequenza di misurazione valore",begdatea:"Data di inizio dei valori",enddatea:"Data di fine dei valori",attrdomv:{caption:"Dominio",edom:{caption:"Enumerato",edomv:"Valore",edomvd:"Definizione",edomvds:"Origine definizione"},rdom:{caption:"Intervallo",rdommin:"Valore Minimo",rdommax:"Valore Massimo",rdommean:"Media",rdomstdv:"Deviazione standard",attrunit:"Unit\u00e0",attrmres:"Risoluzione di misurazione"},codesetd:{caption:"Set di codici",codesetn:"Nome",codesets:"Origine"},
udom:{caption:"Non rappresentabile"}}}},overview:{caption:"Panoramica",eaover:"Riepilogo",eadetcit:"Citazione"}},extent:{caption:"Estensione",section:{description:"Descrizione",geographic:"Geografico",temporal:"Temporale",vertical:"Verticale"},exDesc:"Descrizione estensione",geoEle:{caption:"Estensione geografica",GeoBndBox:{caption:"Riquadro di contorno",esriExtentType:"L'estensione \u00e8 destinata alla ricerca?",exTypeCode:"L'estensione contiene la risorsa?",westBL:"Longitudine confine occidentale",
eastBL:"Longitudine confine orientale",southBL:"Latitudine confine meridionale",northBL:"Latitudine confine settentrionale"},GeoDesc:{caption:"Descrizione geografica",exTypeCode:"La descrizione contiene la risorsa?",identCode:"Codice"}},tempEle:{caption:"Estensione temporale",TM_Period:"Periodo di tempo",TM_Instant:"Istante temporale",tmPosition:"Data",tmBegin:"Data di inizio",tmEnd:"Data di fine"},vertEle:{caption:"Estensione verticale",vertMinVal:"Valore Minimo",vertMaxVal:"Valore Massimo"}},graphOver:{caption:"Grafico di esplorazione",
bgFileName:"URL del grafico di esplorazione",bgFileDesc:"Descrizione del grafico di esplorazione",bgFileType:"Tipo file grafico di esplorazione"},keywords:{caption:"Parole chiave",section:{topicCategory:"Argomento",searchKeys:"Tag",themeKeys:"Tema",placeKeys:"Posiziona",tempKeys:"Temporale",discKeys:"Disciplina",stratKeys:"Strato",productKeys:"Prodotto",subTopicCatKeys:"Sottoargomento",otherKeys:"Altro"},delimited:"Parole chiave",searchKeys:"Tag",themeKeys:"Parole chiave tema",placeKeys:"Parole chiave luogo",
tempKeys:"Parole chiave temporali",discKeys:"Parole chiave disciplina",stratKeys:"Parole chiave strato",productKeys:"Parole chiave prodotto",subTopicCatKeys:"Parole chiave sottoargomento",otherKeys:"Altre parole chiave",thesaName:"Citazione thesaurus",thesaLang:"Lingua del thesaurus"},locales:{caption:"Impostazioni locali",locale:"Impostazioni locali",resTitle:"Titolo",idAbs:"Riepilogo"},maintenance:{caption:"Manutenzione",section:{frequency:"Frequenza",scope:"Ambito",note:"Nota"},usrDefFreq:"Frequenza personalizzata",
dateNext:"Aggiornamento successivo",maintScp:"Ambito aggiornamento",upScpDesc:{caption:"Descrizione ambito",attribSet:"Attributi",attribIntSet:"Istanze attributo",featSet:"Feature",featIntSet:"Istanze feature",datasetSet:"Dataset",other:"Altre istanze"},maintNote:"Nota di manutenzione",maintCont:"Contatto manutenzione"},metadata:{section:{profile:"Profilo",details:"Ambito"},mdFileID:"Identificatore file",mdParentID:"Identificatore padre",datasetURI:"URI dataset",dataSetFn:"Funzione dataset",mdDateSt:"Data del Matadati",
mdLang:"Lingua dei metadata",mdChar:"Set di caratteri",mdHrLv:"Livello gerarchia",mdHrLvName:"Nome livello della gerarchia",mdContact:"Contatto metadati",mdMaint:"Manutenzione dei metadati",mdConst:"Vincoli dei metadati"},porCatInfo:{caption:"Citazione di rappresentazione"},refSysInfo:{caption:"Riferimento spaziale"},resource:{section:{citation:"Citazione",details:"Dettagli",description:"Descrizione",keywords:"Parole chiave",status:"Stato",resolution:"Risoluzione",representation:"Rappresentazione",
browse:"Grafico di esplorazione",format:"Formato",usage:"Utilizzo",aggregateInfo:"Aggregazione",additional:"Aggiuntiva"},idAbs:"Descrizione (compendio)",idPurp:"Riepilogo (scopo)",suppInfo:"Informazioni supplementari",idCredit:"Crediti",envirDesc:"Ambiente di elaborazione",dataLang:"Lingua risorsa",dataExt:"Estensione risorsa",idPoC:"Punto di contatto",resMaint:"Manutenzione risorsa",resConst:"Vincoli risorsa",dsFormat:"Formato risorsa",dataScale:{caption:"Scala dati",equScale:"Risoluzione scala",
scaleDist:"Risoluzione distanza",scaleDist_value:"Distanza"},idSpecUse:{caption:"Uso risorsa",specUsage:"Utilizzo specifico",usageDate:"Data utilizzo",usrDetLim:"Limitazioni",usrCntInfo:"Contatto d'utilizzo"}},service:{caption:"Servizio",svType:"Tipo di servizio",svType_Name:"Nome",svAccProps:"Propriet\u00e0 di accesso",svCouplRes:{caption:"Risorsa accoppiata",svOpName:"Nome operazione",svResCitId:"Identificatore risorsa"},svCoupleType:"Tipo di accoppiamento"},scaleRange:{caption:"Intervallo scala",
maxScale:"Scala Massima",minScale:"Scala minima"},spatRepInfo:{caption:"Rappresentazione spaziale",section:{dimension:"Dimensione",parameters:"Parametri"},numDims:"Numero di dimensioni",tranParaAv:"Disponibilit\u00e0 parametro trasformazione?",axisDimension:{caption:"Dimensione",dimSize:"Dimensioni",dimResol:{caption:"Risoluzione",_value:"Valore di risoluzione",uom:"Unit\u00e0 di risoluzione"}},VectSpatRep:{caption:"Vettoriali",geometObjs:"Oggetti geometrici",geoObjCnt:"Conteggio oggetti"},GridSpatRep:{caption:"Griglia"},
Georect:{caption:"Georettificata",section:{centerPoint:"Punto centrale",cornerPts:"Punti d'angolo"},chkPtAv:"Disponibilit\u00e0 punto di controllo?",chkPtDesc:"Descrizione punto di controllo",ptInPixel:"Punto in pixel",transDimDesc:"Descrizione dimensione trasformazione",transDimMap:"Mappatura dimensioni di trasformazione",cornerPts:{caption:"Punto d'angolo",pos:"Posizione",gmlDesc:"Descrizione",gmlDescRef:"Riferimento",gmlIdent:"Identificatore",codeSpace:"Spazio di codici dell'identificatore"}},
Georef:{caption:"Con riferimento geografico",ctrlPtAv:"Disponibilit\u00e0 punto di controllo?",orieParaAv:"Disponibilit\u00e0 parametro di orientamento?",orieParaDs:"Descrizione del parametro di orientamento",georefPars:"Parametri con riferimento geografico",paraCit:"Citazione parametro"},Indref:{caption:"Indiretto"}},booleanOptions:{_false:"No",_true:"S\u00ec"},codelist:{CountryCode:"Paese",LanguageCode:"Lingua",MonetaryUnits:"Unit\u00e0 monetaria",MonetaryUnits_empty:"Nessuna valuta universale",
PresentationForm:"Formato di presentazione dati geospaziali FGDC",CI_PresentationFormCode:"Formato di presentazione",CI_RoleCode:"Ruolo",CI_OnLineFunctionCode:"Funzione",IMS_ContentType:"Tipo di contenuto",DQ_ElementDimension:"Dimensione",DQ_ElementType:"Tipo di report",DQ_EvaluationMethodTypeCode:"Tipo di valutazione",DS_AssociationTypeCode:"Tipo di associazione",DS_InitiativeTypeCode:"Tipo iniziativa",LI_SourceType:"Tipo sorgente",MD_CellGeometryCode:"Geometria cella",MD_CharacterSetCode:"Set di caratteri",
MD_ClassificationCode:"Classificazione",MD_CoverageContentTypeCode:"Tipo di contenuto",MD_DimensionNameTypeCode:"Tipo di dimensione",MD_GeometricObjectTypeCode:"Tipo oggetto geometrico",MD_ImagingConditionCode:"Condizione di imaging",MD_MaintenanceFrequenceCode:"Frequenza di aggiornamento",MD_MediumFormatCode:"Codice formato",MD_MediumNameCode:"Nome supporto",MD_PixelOrientationCode:"Orientamento pixel",MD_ProgressCode:"Stato",MD_RestrictionCode:"Codice di restrizione",MD_ScopeCode:"Ambito",MD_SpatialRepresentationTypeCode:"Tipo di rappresentazione spaziale",
MD_TopicCategoryCode:"Categoria argomento",MD_TopologyLevelCode:"Livello di topologia",RS_Dimension:"Dimensione",SV_CouplingType:"Tipo di accoppiamento",UCUM:"Unit\u00e0",UCUM_Length:"Unit\u00e0 Distanza"}});