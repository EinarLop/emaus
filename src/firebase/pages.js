import { db } from "./app";

const CONSTANTS = require('./config/config').CONSTANTS;  // page addresses in firestore
/* ------ READ, UPDATE DE PAGES ------- */

const Page = {};

Page.getHome = async () => {
    const data = await db.collection('pages').doc(CONSTANTS.HOME).get();
    return data.data();
}

Page.getDonations = async () => {
    const data = await db.collection('pages').doc(CONSTANTS.DONATE).get();

    return data.data();
}

Page.getEvents = async () => {
    const data = await db.collection('pages').doc(CONSTANTS.EVENTS).get();

    return data.data();
}

Page.getBlog = async () => {
    const data = await db.collection('pages').doc(CONSTANTS.BLOG).get();

    return data.data();
}

// Firestore only updates the defined fields of the passed object.

Page.updateHome = async (page) => {
    // page is an object containing the editable fields of home page
    if (!page) {
        let result = {
            message: 'Client Error: page data is undefined',
            ok: false,
        }
        return result;
    }

    // Home admin page Data
    const pageData = {
        mainTitle: page.mainTitle,
        mainKicker: page.mainKicker,
        mainDescription: page.mainDescription,
        featuredBlogsTitle: page.featuredBlogsTitle,
        featuredBlogsDescription: page.featuredBlogsDescription,
    };

    const pageRef = db.collection('pages').doc('emaus-home-4111');

    try {
        const res = await pageRef.update(pageData);
        console.log("Update page result", res);
        
        let result = {
            message: "La página de Inicio fue actualizada exitosamente.",
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

Page.updateDonations = async (page) => {
    if (!page) {
        let result = {
            message: 'Client Error: page data is undefined',
            ok: false,
        }
        return result;
    }

    // Donations Admin page data
    const pageData = {
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
        officialAddress: page.officialAddress,
    };

    const pageRef = db.collection('pages').doc('emaus-donate-1433');

    try {
        const res = await pageRef.update(pageData);
        console.log("Update page result", res);
        let result = {
            message: "La página de Donaciones fue actualizada exitosamente.",
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

Page.updateBlog = async (page) => {
    if (!page) {
        let result = {
            message: 'Client Error: page data is undefined',
            ok: false,
        }
        return result;
    }

    // Blog Admin page data
    const pageData = {
        mainTitle: page.mainTitle,
        mainKicker: page.mainKicker,
        mainDescription: page.mainDescription,
    };

    const pageRef = db.collection('pages').doc('emaus-blog-4663');

    try {
        const res = await pageRef.update(pageData);
        console.log("Update page result", res);
        let result = {
            message: "La página de Blog fue actualizada exitosamente.",
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

Page.updateEvents = async (page) => {
    if (!page) {
        let result = {
            message: 'Client Error: page data is undefined',
            ok: false,
        }
        return result;
    }

    // Events Admin page data
    const pageData = {
        mainTitle: page.mainTitle,
        mainKicker: page.mainKicker,
        mainDescription: page.mainDescription,
    };

    const pageRef = db.collection('pages').doc('emaus-events-1787');

    try {
        const res = await pageRef.update(pageData);
        console.log("Update page result", res);
        let result = {
            message: "La página de Eventos fue actualizada exitosamente.",
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


export default Page;
