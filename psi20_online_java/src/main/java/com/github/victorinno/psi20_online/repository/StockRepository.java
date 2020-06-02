package com.github.victorinno.psi20_online.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.github.victorinno.psi20_online.model.Stock;

public interface StockRepository extends ReactiveMongoRepository<Stock, ObjectId> {

}
