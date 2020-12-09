package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.GiangVien;
import com.nghiahd.authenticationtest.repository.DTO.GiangVienDTO;
import com.nghiahd.authenticationtest.service.GiangVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class GiangVienRest {

	@Autowired
	GiangVienService giangVienService;

	@GetMapping(value = "/giangvien")
	public ResponseEntity<List<GiangVienDTO>> getAllGiangVien(Pageable pageable, @RequestParam(required = false) String search) {
		Page<GiangVienDTO> page = null;
		HttpHeaders headers = new HttpHeaders();
		try {
			page = giangVienService.getAllGiangVien(pageable, search);
			Common.setHeaders(headers, page);
			if (CollectionUtils.isEmpty(page.getContent()))  {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

		System.out.println(page.getContent());
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@GetMapping("/giangvienByMaGV")
	public ResponseEntity<List<GiangVien>> getByMaGV(@RequestParam("MaGV") String MaGV) {
		List<GiangVien> giangvien = null;
		try {
			giangvien = giangVienService.getGiangVienByMaNV(MaGV);
			if (giangvien == null) {
				return new ResponseEntity<>(giangvien, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(giangvien, HttpStatus.OK);
	}

	@GetMapping("/giangvien/{id}")
	public ResponseEntity<GiangVien> getGiangVienById(@PathVariable Integer id) {
		Optional<GiangVien> giangvien = null;
		try {
			giangvien = giangVienService.getGiangVientById(id);

			if (giangvien.isPresent()) {
				return new ResponseEntity<>(giangvien.get(), HttpStatus.OK);
			}
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/giangvienByHoTenOrMaGV")
	public ResponseEntity<List<GiangVien>> getByHoTenOrMaGV(@RequestParam(required = true) String keyword) {
		List<GiangVien> giangvien = null;
		try {
			giangvien = giangVienService.getGiangVienByHoTenOrMaGV(keyword);
			if (giangvien == null) {
				return new ResponseEntity<>(giangvien, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(giangvien, HttpStatus.OK);
	}

	@PostMapping(value = "/giangvien")
	public ResponseEntity<GiangVien> saveGiangVien(@RequestBody GiangVien giangvien) {
		GiangVien giangvienNew = null;
		try {
			giangvienNew = giangVienService.saveGiangVien(giangvien);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(giangvienNew, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(giangvienNew, HttpStatus.CREATED);
	}

	
	@DeleteMapping("/giangvien/{id}")
	public ResponseEntity<?> deleteGiangVien(@PathVariable("id") Integer id) {
		try {
			giangVienService.deleteGiangVien(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PutMapping("/giangvien/{id}")
	public ResponseEntity<GiangVien> updateGiangVien(@PathVariable("id") Integer id,@RequestBody GiangVienDTO giangvienDTO) {
		GiangVien giangvienNew = null;
		try {
			Optional<GiangVien> giangvienOld = giangVienService.getGiangVientById(id);
			if (giangvienOld.isPresent()) {
				giangvienNew = convertDTOToEntity(giangvienOld.get(), giangvienDTO);
				giangvienNew = giangVienService.saveGiangVien(giangvienNew);
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(giangvienNew, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(giangvienNew, HttpStatus.CREATED);
	}
	
	private GiangVien convertDTOToEntity(GiangVien giangvien, GiangVienDTO giangvienDTO) {
		
		giangvien.setId(giangvienDTO.getId());
		giangvien.setMaGV(giangvienDTO.getMaGV());
		giangvien.setHoTen(giangvienDTO.getHoTen());
		giangvien.setNgaySinh(giangvienDTO.getNgaySinh());
		giangvien.setGioiTinh(giangvienDTO.getGioiTinh());
		giangvien.setNoiSinh(giangvien.getNoiSinh());
		giangvien.setQueQuan(giangvien.getQueQuan());
		giangvien.setDienThoai(giangvienDTO.getDienThoai());
		giangvien.setHocVi(giangvienDTO.getHocVi());
		giangvien.setDonViCongTac(giangvienDTO.getDonViCongTac());
		giangvien.setEmail(giangvienDTO.getEmail());
		
		giangvien.setChucVu(giangvienDTO.getChucVu());
		giangvien.setDanToc(giangvienDTO.getDanToc());
		giangvien.setDiaChi(giangvienDTO.getDiaChi());
		return giangvien;
	}
}
