<?php

namespace Sound\FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sound\FrontBundle\Entity\Creations;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        $repository = $this->getDoctrine()->getRepository('SoundFrontBundle:Media');

        // Getting all the audio files
        $audios = $repository->findByType('audio');
        $audioKey = array_rand($audios);
        $audio = $audios[$audioKey];
        // duration of the audio file
        $audioDuration = $audio->getDuration();

        // Getting all the video files
        $videos = $repository->findByType('video');
        // sorting randomly the videos 
        shuffle($videos);
        
        $videosArray = array();
        $videosId = array();
        foreach ($videos as $video) {
            if ($video->getDuration() <= $audioDuration) {
                $videosArray[] = $video;
                $videosId[] = $video->getId();
                $audioDuration -= $video->getDuration();
            } else {
                break;
            }
        }

        $creation = new Creations();
        $creation->setAudio($audio->getId());
        $creation->setVideos($videosId);

        $em = $this->getDoctrine()->getManager();
        $em->persist($creation);
        $em->flush();

        return array(
            'audioUrl'   => $audio->getPath(),
            'videos'     => $videosArray
        );
    }
}
