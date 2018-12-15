<?php
//*******DÉCLARATION DES VARIABLES*******/
//Initialisation de la variable niveau
$strNiveau = "./";
//Initialisation de la variable du tableau de listes
$arrListes=array();
//Initialisation de la variable du tableau des échéances à venir
$arrEcheances=array();
//Initialisation de la variable du tableau des mois en français
$arrMois = array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
//Initialisation de la variable de l'utilisateur (HARD CODER POUR PROTOTYPE)
$strUtilisateur=1;
//Initilisation de la variable contenant la rétroaction de l'accueil
$strMessageRetro="";

//Récupération du fichier JSON contenant les messages de rétroactions
$strFichierErreurs=file_get_contents($strNiveau.'js/objJSONMessages.json');
$jsonMessagesErreurs=json_decode($strFichierErreurs);

//**************GESTION DES MESSAGES DE RÉTROACTIONS**************/
if(isset($_GET['codeOperation'])){
    if($_GET['codeOperation']=="Add"){
        $strMessageRetro=$jsonMessagesErreurs->{"retroactions"}->{"liste"}->{"ajouter"};
    }    
    else{
        $strMessageRetro=$jsonMessagesErreurs->{"retroactions"}->{"liste"}->{"modifier"};
    }
}

//Inclusion de la config liant aux BD
include ($strNiveau.'inc/scripts/config.inc.php');

//**************SUPPRESSION DE LISTE**************/
if(isset($_GET['supprimerListe'])){
    //Initialisation de la valeur de la liste à supprimer
    $strIdListeDelete=$_GET['supprimerListe'];

    //Requête SQL
    $strRequeteDelete=
    'DELETE from t_liste
    WHERE id_liste=?';

    //Éxécution de la requête
    $pdosResultatDelete=$pdoConnexion->prepare($strRequeteDelete);

    //Récupération de l'erreur, s'il y a lieu
    $strCodeErreur=$pdosResultatDelete->errorCode();
    // var_dump($pdosResultatSupp->errorInfo());

    //Liaison de la valeur de l'id
    $pdosResultatDelete->bindValue(1, $strIdListeDelete);

    //Éxécution de la requête
    $pdosResultatDelete->execute();

    //Message de rétroaction
    $strMessageRetro=$jsonMessagesErreurs->{"retroactions"}->{"liste"}->{"supprimer"};
}
//**************ÉCHÉANCES À VENIR**************/
//Requête SQL
$strRequeteEcheances=
'SELECT id_item, nom_item, echeance, hexadecimale, DAY(echeance) AS jour, MONTH(echeance) AS mois, YEAR(echeance) AS annee, HOUR(echeance) AS heure, MINUTE(echeance) AS minute
FROM t_item
INNER JOIN t_liste ON t_item.id_liste=t_liste.id_liste
INNER JOIN t_couleur ON t_liste.id_couleur=t_couleur.id_couleur
WHERE echeance IS NOT NULL 
ORDER BY echeance ASC
LIMIT 3';

//Éxécution de la requête
$pdosResultatEcheances=$pdoConnexion->query($strRequeteEcheances);

//Formation du array contenant les données des échéances
for($intCpt=0;$ligne=$pdosResultatEcheances->fetch();$intCpt++){
    $arrEcheances[$intCpt]['id_item']=$ligne['id_item'];
    $arrEcheances[$intCpt]['nom_item']=$ligne['nom_item'];
    $arrEcheances[$intCpt]['echeance']=$ligne['echeance'];
    $arrEcheances[$intCpt]['hexadecimale']=$ligne['hexadecimale'];
    $arrEcheances[$intCpt]["jour"] = $ligne["jour"];
    $arrEcheances[$intCpt]["mois"] = $ligne["mois"];
    $arrEcheances[$intCpt]["annee"] = $ligne["annee"];
    $arrEcheances[$intCpt]["heure"] = $ligne["heure"];
    $arrEcheances[$intCpt]["minute"] = $ligne["minute"];
}

$pdosResultatEcheances->closeCursor();


//**************CLASSEMENT DES LISTES**************/
//Requête SQL
$strRequeteListes=
'SELECT id_liste, nom_liste, hexadecimale
FROM t_liste
INNER JOIN t_couleur ON t_liste.id_couleur=t_couleur.id_couleur
WHERE id_utilisateur=? 
ORDER BY nom_liste';

//Préparation la requête
$pdosResultatListes=$pdoConnexion->prepare($strRequeteListes);

//Liaison de la valeur de l'utilisateur
$pdosResultatListes->bindValue(1, $strUtilisateur);

//Éxécution de la requête
$pdosResultatListes->execute();

//Extraction des données et création du array
for($intCpt=0;$ligne=$pdosResultatListes->fetch();$intCpt++){
    $arrListes[$intCpt]['id_liste']=$ligne['id_liste'];
    $arrListes[$intCpt]['nom_liste']=$ligne['nom_liste'];
    $arrListes[$intCpt]['hexadecimale']=$ligne['hexadecimale'];
    $arrListes[$intCpt]['nbItems']="";

    //**************ITEMS LIÉS AUX LISTES**************/
    //Requête SQL
    $strRequeteNbItems=
    'SELECT id_item
    FROM t_item
    WHERE id_liste=?';

    //Éxécution de la requête
    $pdosResultatNbItems=$pdoConnexion->prepare($strRequeteNbItems);
    $pdosResultatNbItems->bindValue(1,$arrListes[$intCpt]['id_liste']);
    $pdosResultatNbItems->execute();
    //Count des résultats 
    $arrListes[$intCpt]['nbItems']=$pdosResultatNbItems->rowCount();

    $pdosResultatNbItems->closeCursor();
    
}
$pdosResultatListes->closeCursor();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width"/>
    <title>Accueil-Projet TOFU</title>
    <!--URL de base pour la navigation -->
    <?php include($strNiveau . "inc/fragments/headLinks.php"); ?>    
</head>
<body class="index">
    <a href="#contenu" class="visuallyHidden focusable">Allez au contenu</a>
    <?php include($strNiveau.'inc/fragments/header.inc.php'); ?>
    <!--http://webaim.org/techniques/skipnav/-->

    <noscript>
        <p>Le JavaScript n'est pas activé dans votre navigateur. Nous vous recommandons de l'activer afin d'améliorer votre expérience utilisateur.</p>
    </noscript>
    <main id="contenu">
        <div class="echeancesBandeau conteneur">
            <div class="echeancesBandeau__dates">
            <?php 
                for($intCpt=0;$intCpt<count($arrEcheances);$intCpt++){ ?>
                    <p><span class="echeancesBandeau__datesCouleurs" style="background-color: #<?php echo $arrEcheances[$intCpt]['hexadecimale']; ?>"></span>
                    <a href="editer-item.php?id_item=<?php echo $arrEcheances[$intCpt]['id_item']; ?>">
                        <?php echo $arrEcheances[$intCpt]['nom_item']; ?>
                    </a>
                    <span class="echeancesBandeau__datesTemps"><?php echo $arrEcheances[$intCpt]['jour']; ?> <?php echo $arrMois[$arrEcheances[$intCpt]['mois']-1]; ?> <?php echo $arrEcheances[$intCpt]['annee']; ?> à 
                        
                        <?php if($arrEcheances[$intCpt]['heure']<='9'){
                            echo '0'.$arrEcheances[$intCpt]['heure']; ?>
                        <?php }
                        else{ 
                            echo $arrEcheances[$intCpt]['heure'];
                        } ?>
                        :
                        <?php if($arrEcheances[$intCpt]['minute']<='9'){
                            echo '0'.$arrEcheances[$intCpt]['minute']; ?>
                        <?php }
                        else{
                            $arrEcheances[$intCpt]['minute'];
                        } ?>
                        </span>
                    </p>
            <?php } ?> 
            </div>
            <div class="echeancesBandeau__notifs">
                <label class="echeancesBandeau__notifsTexte">
                    <input type="checkbox" class="visuallyHidden">
                    <span class="echeancesBandeau__notifsIcon fi flaticon-alarm">
                    </span>
                        Recevoir les notifications des échéances
                </label>
            </div> 
        </div>
        <div class="allLists conteneur">
            <div class="allLists__intro">
                <h1 class="allLists__introTitre">Listes</h1>
                <a href="ajouter-liste.php" class="btn btnOperation fi flaticon-addAfter">Ajouter une liste</a>
            </div>
                <!--Intégration du message de rétroaction-->
                <?php
                    //Si le message a été changé
                    if($strMessageRetro!=""){ ?>
                        <p class="allLists__retroactions">
                            <?php echo $strMessageRetro; ?>
                        </p>
                <?php } ?>
            <div class="allLists__containerFlex">
                <!--Intégration des listes présentes dans l'array créé plus tôt-->
                <?php 
                    for($intCpt=0;$intCpt<count($arrListes);$intCpt++){ ?>
                    <article class="allLists__itemList">
                        <form action="index.php">
                            <input type="hidden" name="id_liste" value="<?php echo $arrListes[$intCpt]['id_liste']; ?>">
                            <header style="background-color: #<?php echo $arrListes[$intCpt]['hexadecimale']; ?>">
                                <p class="allLists__itemListNb">
                                    <?php echo $arrListes[$intCpt]['nbItems']; ?> items
                                </p>
                            </header> 
                            <div class="allLists__itemListContent">
                                <div class="parent_relative">
                                    <h2 class="allLists__itemListNom">
                                        <a href="consulter-liste.php?id_liste=<?php echo $arrListes[$intCpt]['id_liste']; ?>">
                                            <?php echo $arrListes[$intCpt]['nom_liste']; ?>
                                        </a>
                                    </h2>
                                </div>
                                <div class="parent_relative">
                                    <a href="consulter-liste.php?id_liste=<?php echo $arrListes[$intCpt]['id_liste']; ?>" class="allLists__itemListLink fi flaticon-eye">Consulter</a>
                                </div>
                                
                                <div class="parent_relative">
                                    <a href="editer-liste.php?id_liste=<?php echo $arrListes[$intCpt]['id_liste']; ?>" class="allLists__itemListLink fi flaticon-edit">Éditer</a>
                                </div>

                                <a href="index.php#modalDelete<?php echo $arrListes[$intCpt]['id_liste']; ?>" class="allLists__itemListLink--ecard allLists__itemListLink fi flaticon-trash">Supprimer</a>
                            </div>
                            <!--Modal Box utilisé pour la suppression des liste-->
                            <div id="modalDelete<?php echo $arrListes[$intCpt]['id_liste']; ?>" class="modalBox">
                                <div class="modalBox__dialogue">
                                    <div class="modalBox__fenetre">
                                        <header class="modalBox__entete" style="background-color: #<?php echo $arrListes[$intCpt]['hexadecimale']; ?>">
                                        </header>
                                        <a href="index.php#" class="modalBox__fermer">Fermer</a>
                                        <div class="modalBox__contenu">
                                            <p><strong>Voulez-vous vraiment supprimer la liste <?php echo $arrListes[$intCpt]['nom_liste']; ?> et tout ce qu'elle contient?</strong></p>
                                        </div>
                                        <footer class="modalBox__actions">
                                            <button type="submit" name="supprimerListe" class="btn btnOperation" value="<?php echo $arrListes[$intCpt]['id_liste']; ?>">
                                                Supprimer la liste 
                                            </button>
                                            <a href="index.php#" class="btn btnAnnuler">
                                                Annuler
                                            </a>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </article>
                <?php } ?>
            </div>
        </div>
    </main>

    <?php include('inc/fragments/footer.inc.php'); ?>

    <?php include('inc/fragments/footerLinks.inc.php'); ?>
</body>
</html>