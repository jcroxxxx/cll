<?php

require_once "APIWrapper.php";
require_once "Models/CottageRates.php";
require_once "Models/CLLImages.php";

/**
 * Description of ChiefLakeLodgeAPI
 *
 * @author jcrox_000
 */
class ChiefLakeLodgeAPI extends APIWrapper {
    
    
    public function __construct($request, $origin) {
        
        parent::__construct($request);
        
    }
    
    
    
    protected function rates() {
        
       $obj = new CottageRates();
       
       if($this->method == "GET") {
           
           $response = $obj->getRates();
           return $response;
           
       }
        
    }
	
	
	protected function images() {
		
		$obj = new CLLImages();
		
		if($this->method == "GET") {
			
			$response = $obj->getImages();
			return $response;
			
		}
		
	}
    
}
