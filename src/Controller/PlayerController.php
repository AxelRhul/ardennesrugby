<?php

namespace App\Controller;

use App\Entity\Player;
use App\Form\PlayerType;
use App\Repository\CategoryRepository;
use App\Repository\PlayerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/player')]
class PlayerController extends AbstractController
{
    #[Route('/', name: 'player_index', methods: ['GET'])]
    public function index(PlayerRepository $playerRepository,CategoryRepository $categoryRepository): Response
    {
        $players = $playerRepository->findBy([], ['lastname' => 'ASC']);
        return $this->render('player/index.html.twig', [
            'players' => $players,
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'player_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $player = new Player();
        $form = $this->createForm(PlayerType::class, $player);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($player);
            $entityManager->flush();

            return $this->redirectToRoute('player_index');
        }

        return $this->render('player/new.html.twig', [
            'player' => $player,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}/edit', name: 'player_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Player $player, EntityManagerInterface $entityManager,CategoryRepository $categoryRepository): Response
    {
        $form = $this->createForm(PlayerType::class, $player);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('player_index');
        }

        return $this->render('player/edit.html.twig', [
            'player' => $player,
            'form' => $form->createView(),
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    #[Route('/{id}', name: 'player_delete', methods: ['POST'])]
    public function delete(Request $request, Player $player, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$player->getId(), $request->request->get('_token'))) {
            $entityManager->remove($player);
            $entityManager->flush();
        }

        return $this->redirectToRoute('player_index');
    }
}