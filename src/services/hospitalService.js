import http from "@/core/http-common";

class hospitalService{
    endPoint = 'http://localhost:8091/hospital'

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
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
export default new hospitalService();
