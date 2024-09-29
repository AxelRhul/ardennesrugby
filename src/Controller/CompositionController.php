<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CompositionController extends AbstractController
{
    #[Route('/composition', name: 'app_composition')]
    public function index(): Response
    {
        return $this->render('composition/index.html.twig', [
            'controller_name' => 'CompositionController',
        ]);
    }
}
