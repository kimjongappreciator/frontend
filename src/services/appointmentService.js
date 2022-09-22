import http from '../core/http-common'

class appointmentService{
    endPoint = 'http://localhost:8091/appointment'
    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByPatient(user) {
        return http.get(`${this.endPoint}/patient/${user}`);
    }
    getByDoctor(user) {
        return http.get(`${this.endPoint}/doctor/${user}`);
    }
    getByHospital(user) {
        return http.get(`${this.endPoint}/hospital/${user}`);
    }

    create(createAgencyDto) {
        return http.post(this.endPoint, createAgencyDto);
    }
    update(id, updateAgencyDto) {
        return http.put(`${this.endPoint}/${id}`, updateAgencyDto);
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`);
    }
}
export default new appointmentService();
