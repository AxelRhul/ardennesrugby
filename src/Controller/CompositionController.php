<?php

namespace App\Controller;

use App\Repository\PlayerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CompositionController extends AbstractController
{
    ##[Route('/composition', name: 'app_composition')]
    #[Route('/', name: 'app_composition')]
    public function index(PlayerRepository $playerRepository): Response
    {


        return $this->render('composition/index.html.twig', [
            'players' => $playerRepository->findAllSortedByName(),
        ]);
    }
}
