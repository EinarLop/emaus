import { firebase, db, storage } from "./app";

/* ------ CRUD DE PAGES ------- */

const Page = {};

Page.updateHome(page) {
    // page is an object containing the editable fields of home page
    if (!page) {
        let result = {
            message: 'Client Error: page data is undefined',
            ok: false,
        }
        return result;
    }

    const update = {
        electronicDescription: page.electronicDescription,
        traditionalDescription: page.traditionalDescription,
        clabeNumber: page.clabeNumber,
        disclaimerDescription: page.disclaimerDescription,
        officialData: page.officialData,
        voluntariado1Title: page.voluntariado1Title,
        voluntariado1Desc: page.voluntariado1Desc,
        voluntariado2Title: page.voluntariado2Title,
        voluntariado2Desc: page.voluntariado2Desc,
        voluntariado3Title: page.voluntariado3Title,
        voluntariado3Desc: page.voluntariado3Desc,
        email: page.email,
        telephone: page.telephone,
        registerVol: page.registerVol,
    }

    const pageRef = db.collection('post').doc('emaus-home-4111');

    // postData is an object, firestore only updates the defined fields
    try {

        if (postData.posted !== undefined) {
            postData.posted = firebase.firestore.Timestamp.fromDate(new Date());
        }

        await docRef.update(postData);
        
        let result = {
            message: "El post fue actualizado exitosamente.",
            ok: true,
        }
        
        return result

    } catch (e) {
        console.error(e.message);
        let result = {
            ok: false,
            message: 'API error: ' + e.message,
        }

        return result;
    }
}

Page.updateDonations(page) {
    // 
}

Page.updateBlog(page)


export default Page;
