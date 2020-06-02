package com.github.victorinno.psi20_online.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.victorinno.psi20_online.model.Stock;
import com.github.victorinno.psi20_online.repository.StockRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("/api")
public class StockService {

	@Autowired
	StockRepository stockRepository;

	@GetMapping("/stocks")
	public Flux<Stock> findAllStocks() {
		return stockRepository
				.findAll()
				.delayElements(Duration.ofMillis(100))
				.doOnNext(stock -> System.out.println(stock.toString()));
	}

}
