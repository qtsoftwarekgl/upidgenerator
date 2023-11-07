/*eslint-disable*/

module.exports = {
  HEADER: {
    TOKEN: 'x-auth-token',
    CONTENT_TYPE: 'application/json',
    REFRESH_TOKEN: 'refresh_token',
    TIMEOUT: 30000
  },
  ERROR: {
    CODE: 500,
    MSG: 'error',
    INVALID_RESPONSE: 'Invalid response'
  },
  ER_CONFLICT: {
    CODE: 409,
    MSG: 'CONFLICT',
    INVALID_RESPONSE: 'check the document number, upid'
  },
  BAD_REQUEST: {
    CODE: 400,
    MSG: 'BAD_REQUEST',
    INVALID_RESPONSE: 'Invalid request'
  },
  SUCCESS: {
    CODE: 200,
    MSG: 'ok'
  },
  CLAIM_TOKEN_DATA: {
    username: process.env.CLAIM_TOKEN_USERNAME,
    password: process.env.CLAIM_TOKEN_PASSWORD
  },
  BASE_URL: {
    NIDA: process.env.NIDA_BASE_URL
  },
  KEYPHRASE: process.env.KEYPHRASE,
  TOKEN_EXPIRY_TIME: process.env.TOKEN_EXPIRY_TIME,
  LOG_NPR_METRICS: process.env.LOG_NPR_METRICS || 'no',
  URLS: {
    CLAIM_TOKEN: `${process.env.NIDA_BASE_URL}/onlineauthentication/claimtoken`,
    NID: `${process.env.NIDA_BASE_URL}/onlineauthentication/getcitizen`,
    NID_APPLICATION_NUMBER: `${process.env.NIDA_BASE_URL}/onlineauthentication/GetApplicant`,
    NIN: `${process.env.NIDA_BASE_URL}/onlineauthentication/GetApplicant`,
    OTHERS: `${process.env.NIDA_BASE_URL}/onlineauthentication/GetCitizens`,
    UPI: `${process.env.UPI_BASE_URL}/api/v1/users/get`,
    UPI_CHECK: `${process.env.UPI_BASE_URL}/api/v1/users`,
    NOTIFICATIONS: `${process.env.NOTIFICATION_URL}${process.env.BASEPATH}/notifications`,
    NPR_METRICS: `${process.env.EXTERNAL_SERVICES}${process.env.BASEPATH}/nprmetrics`,
    NID_WITH_PHONE_NO: `${process.env.NIDA_BASE_URL}/onlineauthentication/MSIDNOwner`
  },
  FACILITY_AREA: {
    HF: 'HF',
    EMBASSY: 'EMBASSY',
    COMMUNITY: 'COMMUNITY',
    DISTRICT: 'DISTRICT',
    SECTOR: 'SECTOR',
    CELL: 'CELL'
  },
  FACILITY_TYPE: {
    HF: 'HF',
    EMBASSY: 'EMBASSY',
    COMMUNITY: 'COMMUNITY'
  },
  MINISTRY: {
    MOH: 'MOH',
    MINAFFET: 'MINAFFET',
    MINALOC: 'MINALOC'
  },
  STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETED: 'DELETED',
    VERIFIED: 'VERIFIED',
    UN_VERIFIED: 'UN_VERIFIED',
    EXPIRED: 'EXPIRED',
    IN_REVIEW: 'IN_REVIEW',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    UN_APPROVED: 'UN_APPROVED',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
  },
  MSG: {
    HAS_RECORD: 'record(s) found'
  },
  COUNTRY: 'Rwanda',
  ROLES: {
    CR: 'CR',
    NOTIFIER: 'NOTIFIER',
    MINISTRY_ADMIN: 'MINISTRY_ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN',
    SECONDARY_ADMIN: 'SECONDARY_ADMIN',
    LAUNCHER: 'LAUNCHER',
    VIEWER: 'VIEWER',
    ADMIN: 'ADMIN'
  },
  USER_FIELDS: {
    documentType: 1,
    documentNumber: 1,
    surName: 1,
    postNames: 1,
    dateOfBirth: 1,
    maritalStatus: 1,
    sex: 1,
    nationality: 1,
    domicileCountry: 1,
    domicileDistrict: 1,
    domicileProvince: 1,
    domicileSector: 1,
    domicileCell: 1,
    domicileVillage: 1,
    photo: 1,
    phoneNumber: 1,
    email: 1,
    accessType: 1,
    residentialCountry: 1,
    role: 1,
    ministry: 1,
    facilityId: 1,
    facilityArea: 1,
    facilityType: 1,
    facilityName: 1
  },
  REGEX: {
    NAME: /^[a-zA-Z ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ\s -,.']+$/,
    DATE: /^[A-Za-z0-9 /._-]+$/,
    ALPHA_NUMERIC: /^[A-Za-z0-9 /._-]+$/,
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    ALPHA_ONLY: /^[A-Za-z]+$/
  }
}
