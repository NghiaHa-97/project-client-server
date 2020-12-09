package com.nghiahd.authenticationtest.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import com.nghiahd.authenticationtest.domain.QuaTrinhNgoaiNgu;
import com.nghiahd.authenticationtest.service.NgoaiNguService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class NgoaiNguRest {

	@Autowired
	NgoaiNguService ngoaiNguService;

	@GetMapping("/ngoaingu")
	public ResponseEntity<List<NgoaiNgu>> getAll() {
		List<NgoaiNgu> ngoainguList = null;
		try {
			ngoainguList = ngoaiNguService.getAll();
			if (StringUtils.isEmpty(ngoainguList)) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<List<NgoaiNgu>>(ngoainguList, HttpStatus.OK);
	}

	@GetMapping("/getQTNNByGiangVienId/{id}")
	public ResponseEntity<List<QuaTrinhNgoaiNgu>> getQTNNByGiangVienId(@PathVariable("id") Integer id) {
		List<QuaTrinhNgoaiNgu> listQTNN = null;
		try {
			listQTNN = ngoaiNguService.getQTNNByGiangVienId(id);
			if (StringUtils.isEmpty(listQTNN)) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<List<QuaTrinhNgoaiNgu>>(listQTNN, HttpStatus.OK);
	}
	
	@GetMapping("/getQTNNByLatestDay/{id}")
	public ResponseEntity<QuaTrinhNgoaiNgu> getQTNN_NearestDayByGiangVienId(@PathVariable(required = true) Integer id) {
		QuaTrinhNgoaiNgu qtnn =null;
		try {
			qtnn = ngoaiNguService.getQTNN_NearestDayByGiangVienId(id);
			if (qtnn == null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<QuaTrinhNgoaiNgu>(qtnn, HttpStatus.OK);
	}
	
	@PostMapping("/quatrinhngoaingu")
	public ResponseEntity<QuaTrinhNgoaiNgu> saveNgoaiNgu(@RequestBody QuaTrinhNgoaiNgu qtnnBody) {
		QuaTrinhNgoaiNgu qtngoaingu = null;
		try {
			qtngoaingu = ngoaiNguService.saveQTNgoaiNgu(qtnnBody);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<QuaTrinhNgoaiNgu>(qtngoaingu, HttpStatus.OK);
	}
	
//	@PutMapping("/ngoaingu")
//	public ResponseEntity<NgoaiNgu> updateNgoaiNgu(@PathVariable(required = true)Integer id, @RequestBody NgoaiNgu ngoainguBody) {
//		
//	}
}
